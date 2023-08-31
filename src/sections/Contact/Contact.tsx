'use client';

import * as z from 'zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SectionWrapper from '~/components/containers/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';
import Underline from '~/components/Underline';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { useNotifications } from '~/hooks';
import { useAnimate, stagger, useInView } from 'framer-motion';
import useDeviceWidths from '~/hooks/useDeviceWidths';
import LoadingSpinner from '~/components/svgs/LoadingSpinner';
import { baseRoutes, localStorageHasSubmittedContact } from '~/utils/constants';
import { motion } from 'framer-motion';
import SocialLinks from '~/components/containers/SocialLinks';
import { useElementInView } from '~/hooks';

const staggerHeader = stagger(0.2, { startDelay: 0.2, from: 'last' });
const staggerFormInputs = stagger(0.3, { startDelay: 0.5 });

const formSubmitWaitTime = 1000 * 60 * 5;

const ContactSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .nonempty({ message: 'Name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .nonempty({ message: 'Email is required' })
    .email({ message: 'Must be a valid email address' }),
  subject: z
    .string({ required_error: 'Subject is required' })
    .nonempty({ message: 'Subject is required' }),
  message: z
    .string({ required_error: 'Message is required' })
    .nonempty({ message: 'Message is required' }),
});

type ContactType = z.infer<typeof ContactSchema>;

const Contact = () => {
  const [headerRef, animateHeader] = useAnimate();
  const isHeaderInView = useInView(headerRef, { once: true });

  const [formRef, animateForm] = useAnimate();
  const isFormInView = useInView(formRef, { once: true });

  const [loadingEmailSend, setLoadingEmailSend] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const { isMobileView } = useDeviceWidths();

  const { notify } = useNotifications();
  const { register, handleSubmit, reset, formState } = useForm<ContactType>({
    resolver: zodResolver(ContactSchema),
  });

  const { errors, isSubmitting } = formState;

  const isSectionInView = useInView(headerRef, {
    margin: '-30px 0px',
  });
  const { updateElementInView } = useElementInView();

  useEffect(() => {
    if (isSectionInView) updateElementInView(baseRoutes.contact);
  }, [isSectionInView]); // eslint-disable-line

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID!);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    animateHeader(
      '.section-header',
      { opacity: !isHeaderInView ? 0 : 1 },
      { duration: 0.2, delay: 0.1 },
    );

    // eslint-disable-next-line
    animateHeader(
      '.header-text',
      {
        y: !isHeaderInView ? -50 : 0,
        opacity: !isHeaderInView ? 0 : 1,
        scale: !isHeaderInView ? 0.7 : 1,
      },
      {
        duration: 0.2,
        delay: !isHeaderInView ? 0 : staggerHeader,
      },
    );

    // eslint-disable-next-line
    animateHeader(
      '.flavor-text',
      {
        y: !isHeaderInView ? -50 : 0,
        opacity: !isHeaderInView ? 0 : 1,
        scale: !isHeaderInView ? 0.7 : 1,
      },
      {
        duration: 0.2,
        delay: 0.8,
      },
    );
  }, [isHeaderInView]); // eslint-disable-line

  useEffect(() => {
    // eslint-disable-next-line
    animateForm(
      '.form-input',
      {
        opacity: !isFormInView ? 0 : 1,
        x: !isFormInView ? 150 : 0,
      },
      {
        duration: 0.2,
        delay: !isFormInView ? 0 : staggerFormInputs,
      },
    );
  }, [isFormInView]); // eslint-disable-line

  useEffect(() => {
    if (localStorage[localStorageHasSubmittedContact]) setIsFormSubmitted(true);
  }, []);

  useEffect(() => {
    let formSubmitTimerId: ReturnType<typeof setTimeout>;
    if (isFormSubmitted && localStorage[localStorageHasSubmittedContact]) {
      const localStorageSubmitDate: string = localStorage[
        localStorageHasSubmittedContact
      ] as string;
      const previousSubmitDate: Date = new Date(localStorageSubmitDate);
      const currentDate: Date = new Date();

      if (previousSubmitDate) {
        const diffInMillis = Math.abs(
          currentDate.getTime() - previousSubmitDate.getTime(),
        );

        const formSubmit = diffInMillis < formSubmitWaitTime;

        if (formSubmit) {
          formSubmitTimerId = setTimeout(() => {
            localStorage.removeItem(localStorageHasSubmittedContact);
            setIsFormSubmitted(false);
          }, formSubmitWaitTime - diffInMillis);
        }
      }
    }

    return () => formSubmitTimerId && clearTimeout(formSubmitTimerId);
  }, [isFormSubmitted]);

  const sanitizeHtml = useCallback((str: string) => {
    return str
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }, []);

  const onContactSubmit: SubmitHandler<ContactType> = (data) => {
    setLoadingEmailSend(true);
    const emailData = {
      to_name: 'Tyler',
      subject: sanitizeHtml(data.subject),
      from_name: sanitizeHtml(data.name),
      from_email: data.email,
      message: sanitizeHtml(data.message),
    };

    if (formRef.current !== null) {
      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          emailData,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID,
        )
        .then(
          (result: EmailJSResponseStatus) => {
            if (result.text === 'OK') {
              // Set loading to false
              setLoadingEmailSend(false);

              // Reset the form
              reset();

              // Set submitted date to localstorage and flip state
              localStorage[localStorageHasSubmittedContact] =
                new Date().toISOString();
              setIsFormSubmitted(true);

              // Notify success
              notify.success(
                'In the mean time, feel free to check out my resume or reach out to me directly at one my socials: ',
                'Check me out!',
                0,
                <SocialLinks
                  wrapperClassName="mt-6"
                  linkColors="fill-dark stroke-dark"
                />,
              );

              notify.success(
                "Thanks for the message! The electrons are on their way, so I'll get back to you as soon as I can! ",
                undefined,
                6000,
              );
            }
          },
          (error: EmailJSResponseStatus) => {
            // Set loading to false
            setLoadingEmailSend(false);

            // Notify error
            notify.error(
              'Oops! There was some sort of error. Try again in a few or email directly at tyler.simoni.8@gmail.com',
              error.status.toString(),
              0,
            );
          },
        );
    }
  };

  return (
    <SectionWrapper id="contact" className="!gap-0 pt-[80px] sm:mt-5 sm:pt-16">
      <div ref={headerRef} className="flex w-full flex-col items-center">
        <Heading
          as="h1"
          className="section-header flex flex-col items-center justify-center text-center"
        >
          <GradientTextColor className="header-text">Contact</GradientTextColor>
          <Underline className="header-text min-w-[250px] max-w-xl bg-brandLight-500 px-4 dark:bg-brandDark-500" />
        </Heading>
        {!isFormSubmitted ? (
          <p className="flavor-text mt-2 flex flex-col text-center text-lg sm:flex-row sm:gap-2">
            <span>Want to work together? </span>
            <span> Let&apos;s connect 🚀 </span>
          </p>
        ) : (
          <p className="flavor-text mt-2 text-center text-lg">
            {`Thanks for reaching out! I'll get back to you ASAP 🎉`}
          </p>
        )}
        <form
          id="contact-form"
          ref={formRef}
          className="mt-8 flex w-full flex-col gap-3 md:w-4/5"
          onSubmit={handleSubmit(onContactSubmit)}
          noValidate
        >
          <div className="form-input relative flex flex-col gap-[5px]">
            <label htmlFor="name" className="hidden h-0 w-0">
              Name:
            </label>
            <motion.input
              type="text"
              form="contact-form"
              placeholder={
                isFormSubmitted ? '> try again in 5 ⏰' : '> enter your name '
              }
              aria-invalid={errors.name ? 'true' : 'false'}
              disabled={isFormSubmitted}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${
                errors.name ? 'border-2 !border-error-500 focus:ring-0' : ''
              } h-10 rounded-md bg-white/90 px-4 py-1 shadow-md shadow-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutrals-600 dark:bg-neutrals-700/90 dark:shadow-none dark:focus:ring-neutrals-500`}
              {...register('name', { required: true })}
            />
            {errors.name ? (
              <p
                role="alert"
                className={`absolute right-[10px] top-[-5px] z-10 bg-error-500 px-1 py-0.5 !text-xs leading-[0.8rem] text-dark-base sm:rounded-md sm:px-2 sm:py-1 sm:text-sm ${
                  isMobileView ? 'rounded-md' : 'rounded-sm'
                }`}
              >
                {isMobileView ? '*required' : errors.name?.message}
              </p>
            ) : null}
          </div>

          <div className="form-input relative flex flex-col gap-[5px]">
            <label htmlFor="email" className=" hidden h-0 w-0">
              Email:{' '}
            </label>
            <motion.input
              type="email"
              form="contact-form"
              placeholder={
                isFormSubmitted ? '> try again in 5 ⏰' : '> enter your email'
              }
              aria-invalid={errors.email ? 'true' : 'false'}
              disabled={isFormSubmitted}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${
                errors.email ? 'border-2 !border-error-500 focus:ring-0' : ''
              } h-10 rounded-md bg-white/90 px-4 py-1 shadow-md shadow-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutrals-600 dark:bg-neutrals-700/90 dark:shadow-none dark:focus:ring-neutrals-500`}
              {...register('email', { required: true })}
            />
            {errors.email ? (
              <p
                role="alert"
                className={`absolute right-[10px] top-[-5px] z-10 bg-error-500 px-1 py-0.5 !text-xs leading-[0.8rem] text-dark-base sm:rounded-md sm:px-2 sm:py-1 sm:text-sm ${
                  isMobileView ? 'rounded-md' : 'rounded-sm'
                }`}
              >
                {isMobileView
                  ? errors.email?.message?.includes('valid')
                    ? '*not valid'
                    : '*required'
                  : errors.email?.message}
              </p>
            ) : null}
          </div>

          <div className="form-input relative flex flex-col gap-[5px]">
            <label htmlFor="subject" className="hidden h-0 w-0">
              Subject:
            </label>
            <motion.input
              type="text"
              form="contact-form"
              placeholder={
                isFormSubmitted ? '> try again in 5 ⏰' : '> enter a subject'
              }
              aria-invalid={errors.subject ? 'true' : 'false'}
              disabled={isFormSubmitted}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${
                errors.subject ? 'border-2 !border-error-500 focus:ring-0' : ''
              } h-10 rounded-md bg-white/90 px-4 py-1 shadow-md shadow-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutrals-600 dark:bg-neutrals-700/90 dark:shadow-none dark:focus:ring-neutrals-500`}
              {...register('subject', { required: true })}
            />
            {errors.subject ? (
              <p
                role="alert"
                className={`absolute right-[10px] top-[-5px] z-10 bg-error-500 px-1 py-0.5 !text-xs leading-[0.8rem] text-dark-base sm:rounded-md sm:px-2 sm:py-1 sm:text-sm ${
                  isMobileView ? 'rounded-md' : 'rounded-sm'
                }`}
              >
                {isMobileView ? '*required' : errors.subject?.message}
              </p>
            ) : null}
          </div>

          <div className="form-input relative flex flex-col gap-[5px]">
            <label htmlFor="message" className="hidden h-0 w-0">
              Message:{' '}
            </label>
            <motion.textarea
              form="contact-form"
              aria-invalid={errors.message ? 'true' : 'false'}
              rows={10}
              placeholder={
                isFormSubmitted
                  ? '> try again in 5 ⏰'
                  : '> please leave a message after the beep... BEEP!'
              }
              disabled={isFormSubmitted}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${
                errors.message ? 'border-2 !border-error-500 focus:ring-0' : ''
              } min-h-[2.5rem] resize-y rounded-md bg-white/90 px-4 py-1 shadow-md shadow-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutrals-600 dark:bg-neutrals-700/90 dark:shadow-none dark:focus:ring-neutrals-500`}
              {...register('message', { required: true })}
            />
            {errors.message ? (
              <p
                role="alert"
                className={`absolute right-[10px] top-[-5px] z-10 bg-error-500 px-1 py-0.5 !text-xs leading-[0.8rem] text-dark-base sm:rounded-md sm:px-2 sm:py-1 sm:text-sm ${
                  isMobileView ? 'rounded-md' : 'rounded-sm'
                }`}
              >
                {isMobileView ? '*required' : errors.message?.message}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isFormSubmitted}
            className="form-input group mt-2 flex h-12 w-full cursor-pointer items-center justify-center self-end rounded-lg border-2 border-neutrals-800 px-2 py-1 font-bold transition-colors duration-200 ease-in-out hover:border-brandLight-500 hover:bg-brandLight-500 hover:text-white disabled:cursor-not-allowed disabled:border-neutrals-400 disabled:text-neutrals-500 disabled:hover:border-0 disabled:hover:bg-neutrals-500 disabled:hover:text-neutrals-400 dark:border-neutrals-200 dark:hover:border-brandDark-500 dark:hover:bg-brandDark-500 disabled:dark:border-neutrals-600 disabled:dark:text-neutrals-600 disabled:dark:hover:bg-neutrals-500 sm:w-1/2"
          >
            {!loadingEmailSend && !isSubmitting ? (
              isFormSubmitted ? (
                'Hold your horses 🐴'
              ) : (
                'Send first contact 👽'
              )
            ) : (
              <LoadingSpinner
                loadingText="Loading..."
                spinnerFill="fill-brandLight-500 dark:fill-brandDark-500 group-hover:fill-brandLight-600 group-hover:dark:fill-brandDark-300"
              />
            )}
          </button>
        </form>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
