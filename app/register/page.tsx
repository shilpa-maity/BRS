// 'use client';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { api } from '@/lib/api';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// const schema = z.object({
//   instituteName: z.string().min(2),
//   instituteType: z.enum(['Coaching Center','Educational Institute','Corporate Training','Individual Tutor']),
//   fullName: z.string().min(2),
//   email: z.string().email(),
//   phone: z.string().min(8),
//   address: z.string().min(4),
//   city: z.string().min(2),
//   state: z.string().min(2),
//   postalCode: z.string().min(3),
//   password: z.string().min(8),
//   confirmPassword: z.string().min(8),
//   acceptTnC: z.literal(true, { errorMap: () => ({ message: 'Required' }) }),
//   acceptPrivacy: z.literal(true, { errorMap: () => ({ message: 'Required' }) }),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords must match",
//   path: ["confirmPassword"],
// });

// type FormData = z.infer<typeof schema>;

// export default function RegisterPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
//     resolver: zodResolver(schema),
//     defaultValues: { instituteType: 'Coaching Center' }
//   });

//   const onSubmit = async (data: FormData) => {
//     setLoading(true);
//     try {
//       await api.post('/auth/register', {
//         ...data,
//       });
//       alert('Registered! Check your email to verify.');
//       router.push('/verify-email');
//     } catch (e:any) {
//       alert(e?.response?.data?.message || 'Error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4">
//       <h1 className="text-xl font-semibold">Admin Registration</h1>
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label>Institute/Organization Name</label>
//           <input className="input" {...register('instituteName')} />
//           <p className="text-red-400 text-sm">{errors.instituteName?.message}</p>
//         </div>
//         <div>
//           <label>Institute Type</label>
//           <select className="input" {...register('instituteType')}>
//             <option>Coaching Center</option>
//             <option>Educational Institute</option>
//             <option>Corporate Training</option>
//             <option>Individual Tutor</option>
//           </select>
//           <p className="text-red-400 text-sm">{errors.instituteType?.message}</p>
//         </div>
//         <div>
//           <label>Admin Full Name</label>
//           <input className="input" {...register('fullName')} />
//           <p className="text-red-400 text-sm">{errors.fullName?.message}</p>
//         </div>
//         <div>
//           <label>Official Email Address</label>
//           <input className="input" {...register('email')} />
//           <p className="text-red-400 text-sm">{errors.email?.message}</p>
//         </div>
//         <div>
//           <label>Phone Number (E.164)</label>
//           <input className="input" placeholder="+91XXXXXXXXXX" {...register('phone')} />
//           <p className="text-red-400 text-sm">{errors.phone?.message}</p>
//         </div>
//         <div>
//           <label>Institute Address</label>
//           <input className="input" {...register('address')} />
//           <p className="text-red-400 text-sm">{errors.address?.message}</p>
//         </div>
//         <div>
//           <label>City</label>
//           <input className="input" {...register('city')} />
//           <p className="text-red-400 text-sm">{errors.city?.message}</p>
//         </div>
//         <div>
//           <label>State</label>
//           <input className="input" {...register('state')} />
//           <p className="text-red-400 text-sm">{errors.state?.message}</p>
//         </div>
//         <div>
//           <label>Postal Code</label>
//           <input className="input" {...register('postalCode')} />
//           <p className="text-red-400 text-sm">{errors.postalCode?.message}</p>
//         </div>
//         <div>
//           <label>Password</label>
//           <input type="password" className="input" {...register('password')} />
//           <p className="text-red-400 text-sm">{errors.password?.message}</p>
//         </div>
//         <div>
//           <label>Confirm Password</label>
//           <input type="password" className="input" {...register('confirmPassword')} />
//           <p className="text-red-400 text-sm">{errors.confirmPassword?.message}</p>
//         </div>
//       </div>
//       <div className="space-y-2">
//         <label className="flex items-center gap-2"><input type="checkbox" {...register('acceptTnC')} /> Accept Terms & Conditions</label>
//         <label className="flex items-center gap-2"><input type="checkbox" {...register('acceptPrivacy')} /> Accept Privacy Policy</label>
//         <p className="text-red-400 text-sm">{errors.acceptTnC?.message || errors.acceptPrivacy?.message}</p>
//       </div>
//       <button className="btn" disabled={loading}>{loading ? 'Submitting…' : 'Create Account'}</button>
//     </form>
//   );
// }


'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FieldErrors } from 'react-hook-form';

const schema = z.object({
  instituteName: z.string().min(2),
  instituteType: z.enum(['Coaching Center','Educational Institute','Corporate Training','Individual Tutor']),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  address: z.string().min(4),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(3),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  acceptTnC: z.literal(true, { errorMap: () => ({ message: 'Required' }) }),
  acceptPrivacy: z.literal(true, { errorMap: () => ({ message: 'Required' }) }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { instituteType: 'Coaching Center' },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // Call API
      await api.post('/register', data);
      alert('Registered! Check your email to verify.');
      router.push('/verify-email');
    } catch (e: unknown) {
      console.error("Full API Error:", e);

      const axiosError = e as any;
      const apiErrors: Record<string, string> = axiosError?.response?.data?.errors;

      if (apiErrors) {
        // Map API errors to form fields
        (Object.keys(apiErrors) as (keyof FormData)[]).forEach((field) => {
          setError(field, { type: "server", message: apiErrors[field] });
        });

        // Scroll to first error
        const firstErrorField = Object.keys(apiErrors)[0];
        const el = document.querySelector<HTMLInputElement | HTMLSelectElement>(`[name="${firstErrorField}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus();
      } else {
        alert(axiosError?.response?.data?.message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4 p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Registration</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Institute/Organization Name</label>
          <input className="input" {...register('instituteName')} />
          <p className="text-red-500 text-sm">{errors.instituteName?.message}</p>
        </div>

        <div>
          <label>Institute Type</label>
          <select className="input" {...register('instituteType')}>
            <option>Coaching Center</option>
            <option>Educational Institute</option>
            <option>Corporate Training</option>
            <option>Individual Tutor</option>
          </select>
          <p className="text-red-500 text-sm">{errors.instituteType?.message}</p>
        </div>

        <div>
          <label>Admin Full Name</label>
          <input className="input" {...register('fullName')} />
          <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
        </div>

        <div>
          <label>Email</label>
          <input className="input" {...register('email')} />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <label>Phone Number (E.164)</label>
          <input className="input" placeholder="+91XXXXXXXXXX" {...register('phone')} />
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>
        </div>

        <div>
          <label>Institute Address</label>
          <input className="input" {...register('address')} />
          <p className="text-red-500 text-sm">{errors.address?.message}</p>
        </div>

        <div>
          <label>City</label>
          <input className="input" {...register('city')} />
          <p className="text-red-500 text-sm">{errors.city?.message}</p>
        </div>

        <div>
          <label>State</label>
          <input className="input" {...register('state')} />
          <p className="text-red-500 text-sm">{errors.state?.message}</p>
        </div>

        <div>
          <label>Postal Code</label>
          <input className="input" {...register('postalCode')} />
          <p className="text-red-500 text-sm">{errors.postalCode?.message}</p>
        </div>

        <div>
          <label>Password</label>
          <input type="password" className="input" {...register('password')} />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <div>
          <label>Confirm Password</label>
          <input type="password" className="input" {...register('confirmPassword')} />
          <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('acceptTnC')} /> Accept Terms & Conditions
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('acceptPrivacy')} /> Accept Privacy Policy
        </label>
        <p className="text-red-500 text-sm">{errors.acceptTnC?.message || errors.acceptPrivacy?.message}</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4"
      >
        {loading ? 'Submitting…' : 'Create Account'}
      </button>
    </form>
  );
}
