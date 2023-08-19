'use client';

import * as z from 'zod';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SectionWrapper from '~/components/containers/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';
import Underline from '~/components/Underline';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { useNotificationContext } from '~/components/containers/NotificationProvider';
import { useAnimate, stagger, useInView } from 'framer-motion';

const staggerHeader = stagger(0.2, { startDelay: 0.4, from: 'last' });
const staggerFormInputs = stagger(0.2, { startDelay: 0.5 });

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
    .nonempty({ message: 'Message is required' })
    .min(20, 'Message must be at least 20 characters'),
});

type ContactType = z.infer<typeof ContactSchema>;

const Contact = () => {
  const [headerRef, animateHeader] = useAnimate();
  const isHeaderInView = useInView(headerRef, { once: true });

  const [formRef, animateForm] = useAnimate();
  const isFormInView = useInView(formRef, { once: true });

  const { notify } = useNotificationContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactType>({
    resolver: zodResolver(ContactSchema),
  });

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID!);
  }, []);

  useEffect(() => {
    const animate = async () => {
      await animateHeader(
        '.section-header',
        { opacity: !isHeaderInView ? 0 : 1 },
        { duration: 0.2, delay: 0.1 },
      );

      await animateHeader(
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

      await animateHeader(
        '.flavor-text',
        {
          y: !isHeaderInView ? -50 : 0,
          opacity: !isHeaderInView ? 0 : 1,
          scale: !isHeaderInView ? 0.7 : 1,
        },
        {
          duration: 0.2,
        },
      );
    };
    animate();
  }, [isHeaderInView]);

  useEffect(() => {
    const animate = async () => {
      await animateForm(
        '.form-input',
        {
          opacity: !isFormInView ? 0 : 1,
          x: !isFormInView ? -100 : 0,
        },
        {
          duration: 0.2,
          delay: !isFormInView ? 0 : staggerFormInputs,
        },
      );
    };
    animate();
  }, [isFormInView]);

  const onContactSubmit: SubmitHandler<ContactType> = (data) => {
    const emailData = {
      to_name: 'Tyler',
      subject: data.subject,
      from_name: data.name,
      from_email: data.email,
      message: data.message,
    };

    //console.log('Template Params: ', emailData);
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
              //console.log('Email Resp: ', result);
              notify.success(
                "Thanks for the message! The electrons are on their way and I'll get back to you as soon as I can.",
                undefined,
                5000,
              );
            }
          },
          (error: EmailJSResponseStatus) => {
            //console.log('Email Error: ', error);
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
    <SectionWrapper id="contact" className="!gap-0">
      <div ref={headerRef} className="flex w-full flex-col items-center">
        <Heading
          as="h1"
          className="section-header flex flex-col items-center justify-center text-center"
        >
          <GradientTextColor className="header-text">Contact</GradientTextColor>
          <Underline className="header-text min-w-[250px] max-w-xl bg-brandLight-500 px-4 dark:bg-brandDark-500" />
        </Heading>
        <p className="flavor-text mt-2 text-center text-lg">
          Want to work together?
          <br className="xs:hidden" /> Let&apos;s connect 🚀
        </p>
        <form
          id="contact-form"
          ref={formRef}
          className="mt-8 flex w-full flex-col gap-5 md:w-4/5"
          onSubmit={handleSubmit(onContactSubmit)}
          noValidate
        >
          <div className="form-input relative flex flex-col gap-[5px]">
            <label htmlFor="name" className="hidden h-0 w-0">
              Name:
            </label>
            <input
              type="text"
              form="contact-form"
              placeholder="> enter your name "
              aria-invalid={errors.name ? 'true' : 'false'}
              className={`${
                errors.name ? ' ring-2 !ring-error-500' : ''
              } h-10 rounded-md bg-transparent px-4 py-1 backdrop-brightness-125 focus:outline-none focus:ring-2 focus:ring-neutrals-600 dark:focus:ring-neutrals-500`}
              {...register('name', { required: true })}
            />
            {errors.name ? (
              <p
                role="alert"
                className="absolute right-[10px] top-[-10px] z-10 rounded-md bg-error-500 px-2 py-1 text-sm text-dark-base"
              >
                {errors.name?.message}
              </p>
            ) : null}
          </div>

          <div className="form-input relative flex flex-col gap-[5px]">
            <label htmlFor="email" className=" hidden h-0 w-0">
              Email:{' '}
            </label>
            <input
              type="email"
              form="contact-form"
              placeholder="> enter your email"
              aria-invalid={errors.email ? 'true' : 'false'}
              className={`${
                errors.email ? 'ring-2 !ring-error-500 ' : ''
              } h-10 rounded-md bg-transparent px-4 py-1 backdrop-brightness-125 focus:outline-none focus:ring-2 focus:ring-neutrals-600 dark:focus:ring-neutrals-500`}
              {...register('email', { required: true })}
            />
            {errors.email ? (
              <p
                role="alert"
                className="absolute right-[10px] top-[-10px] z-10 rounded-md bg-error-500 px-2 py-1 text-sm text-dark-base"
              >
                {errors.email?.message}
              </p>
            ) : null}
          </div>

          <div className="form-input relative flex flex-col gap-[5px]">
            <label htmlFor="subject" className="hidden h-0 w-0">
              Subject:
            </label>
            <input
              type="text"
              form="contact-form"
              placeholder="> enter a subject"
              aria-invalid={errors.subject ? 'true' : 'false'}
              className={`${
                errors.subject ? 'ring-2 !ring-error-500' : ''
              } h-10 rounded-md bg-transparent px-4 py-1 backdrop-brightness-125 focus:outline-none focus:ring-2 focus:ring-neutrals-600 dark:focus:ring-neutrals-500`}
              {...register('subject', { required: true })}
            />
            {errors.subject ? (
              <p
                role="alert"
                className="absolute right-[10px] top-[-10px] z-10 rounded-md bg-error-500 px-2 py-1 text-sm text-dark-base"
              >
                {errors.subject?.message}
              </p>
            ) : null}
          </div>

          <div className="form-input relative flex flex-col gap-[5px]">
            <label htmlFor="message" className="hidden h-0 w-0">
              Message:{' '}
            </label>
            <textarea
              form="contact-form"
              aria-invalid={errors.message ? 'true' : 'false'}
              rows={10}
              placeholder="> please leave a message after the beep... BEEP!"
              className={`${
                errors.message ? 'ring-2 !ring-error-500' : ''
              } min-h-[2.5rem] resize-y rounded-md bg-transparent px-4 py-1 backdrop-brightness-125 focus:outline-none focus:ring-2 focus:ring-neutrals-600 dark:focus:ring-neutrals-500`}
              {...register('message', { required: true })}
            />
            {errors.message ? (
              <p
                role="alert"
                className="absolute right-[10px] top-[-10px] z-10 rounded-md bg-error-500 px-2 py-1 text-sm text-dark-base"
              >
                {errors.message?.message}
              </p>
            ) : null}
          </div>

          <input
            type="submit"
            className="form-input mt-2 h-12 w-1/2 cursor-pointer self-end rounded-lg border-2 border-neutrals-800 font-bold transition-colors duration-200 ease-in-out hover:border-brandLight-500 hover:bg-brandLight-500 hover:text-white dark:border-neutrals-200 dark:hover:border-brandDark-500 dark:hover:bg-brandDark-500"
          />
        </form>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
