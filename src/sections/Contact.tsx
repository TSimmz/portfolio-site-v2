'use client';

import * as z from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SectionWrapper from '~/components/containers/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';

const ContactSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .nonempty({ message: 'Name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .nonempty({ message: 'Email is required' })
    .email({ message: 'Must be a valid email address' }),
  message: z
    .string({ required_error: 'A message is required' })
    .nonempty({ message: 'A message is required' })
    .min(20, 'Message must be at least 20 characters'),
});

type ContactType = z.infer<typeof ContactSchema>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactType>({
    resolver: zodResolver(ContactSchema),
  });

  const onContactSubmit: SubmitHandler<ContactType> = (data) => {
    console.log('Contact Data: ', data);
  };

  console.log('Errors: ', errors);

  return (
    <SectionWrapper id="portfolio">
      <Heading as="h1" className="text-center">
        <GradientTextColor>Contact</GradientTextColor>
      </Heading>
      <form
        id="contact-form"
        className="flex w-full flex-col gap-4 md:w-4/5"
        onSubmit={handleSubmit(onContactSubmit)}
      >
        <div className="flex flex-col gap-[5px]">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            form="contact-form"
            aria-invalid={errors.name ? 'true' : 'false'}
            className="h-10 rounded-lg bg-transparent px-4 py-1 backdrop-brightness-125 focus:outline-none focus:ring-2 focus:ring-slate-500"
            {...register('name', { required: true })}
          />
          {errors.name ? (
            <p role="alert" className="text-base text-rose-500">
              {errors.name?.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-[5px]">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            form="contact-form"
            aria-invalid={errors.email ? 'true' : 'false'}
            className="h-10 rounded-lg bg-transparent px-4 py-1 backdrop-brightness-125 focus:outline-none focus:ring-2 focus:ring-slate-500"
            {...register('email', { required: true })}
          />
          {errors.email ? (
            <p role="alert" className="text-base text-rose-500">
              {errors.email?.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-[5px]">
          <label htmlFor="message">Message: </label>
          <textarea
            form="contact-form"
            aria-invalid={errors.message ? 'true' : 'false'}
            rows={10}
            className="min-h-[2.5rem] resize-y rounded-lg bg-transparent px-4 py-1 backdrop-brightness-125 focus:outline-none focus:ring-2 focus:ring-slate-500"
            {...register('message', { required: true })}
          />
          {errors.message ? (
            <p role="alert" className="text-base text-rose-500">
              {errors.message?.message}
            </p>
          ) : null}
        </div>

        <input
          type="submit"
          className="mt-2 h-12 cursor-pointer rounded-lg bg-rose-500 font-bold"
        />
      </form>
    </SectionWrapper>
  );
};

export default Contact;
