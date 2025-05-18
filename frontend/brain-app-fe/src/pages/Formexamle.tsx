import { useForm } from 'react-hook-form';

export function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <input
        {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/, message: "Invalid email" } })}
        className="border border-gray-400 p-2 rounded"
        placeholder="Email"
      />
      {errors.email?.message && <div className="text-red-500 text-sm">{errors.email.message?.toString()}</div>}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
