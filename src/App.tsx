import { FC } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const NoEMailSchema = z.object({
  name: z.string(),
  sendToEMail: z.literal(false),
});

const EMailSchema = z.object({
  name: z.string(),
  sendToEMail: z.literal(true),
  email: z.string().email(),
});

const FormSchema = z.discriminatedUnion('sendToEMail', [
  NoEMailSchema,
  EMailSchema,
]);

type FormSchemaType = z.infer<typeof FormSchema>;

const App: FC = () => {
  const { register, watch, handleSubmit } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const sendToEMail = watch('sendToEMail');

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='max-w-xl w-full mx-auto px-4 py-32'>
        <form className='bg-white rounded-lg px-8 py-12 shadow-lg'>
          <h1 className='text-orange-600 text-xl font-semibold mb-8'>
            Order Package
          </h1>
          <label className='block'>
            <span className='block mb-1 text-gray-600'>Your name</span>
            <input
              className='w-full rounded-lg border-gray-300 border focus:ring-0 focus:border-orange-600 p-3'
              type='text'
              {...register('name')}
            />
          </label>
          <label className='block mt-6 flex items-center'>
            <input
              type='checkbox'
              className='text-orange-600 w-5 h-5 border-gray-300 focus:ring-0 focus:ring-offset-0 hover:cursor-pointer'
              {...register('sendToEMail')}
            />
            <span className='ml-2 text-gray-600 hover:cursor-pointer'>
              Send receipt to email?
            </span>
          </label>

          {sendToEMail && (
            <label className='block mt-6'>
              <span className='block mb-1 text-gray-600'>Email</span>
              {/* Input will be unregistered after unmount and defaultValues will be removed as well. */}
              <input
                className='w-full rounded-lg border-gray-300 border focus:ring-0 focus:border-orange-600 p-3'
                type='text'
                {...register('email', { shouldUnregister: true })}
              />
            </label>
          )}
          <br />
          {/* You can tick and untick checkbox to see the value change */}
          <pre>{JSON.stringify(watch(), null, 2)}</pre>

          <button className='mt-12 w-full bg-orange-600 rounded-lg px-6 py-3 text-white font-medium hover:cursor-pointer'>
            Order Package
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
