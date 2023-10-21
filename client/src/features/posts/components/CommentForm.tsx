/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type CommentInput = {
  comment: string;
};
export default function CommentForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<CommentInput>({
    mode: 'all',
  });
  const onSubmit: SubmitHandler<CommentInput> = (data) => {
    console.log(data);
    reset();
  };
  return (
    <form
      className="w-full flex items-center h-10 fixed bottom-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        id="comment"
        placeholder="Share your thoughts..."
        className="h-full w-full rounded-l-lg px-2 ml-1 text-black"
        {...register('comment', { required: true })}
      />
      <button
        type="submit"
        disabled={!isValid}
        className={`h-full w-20 rounded-r-lg mr-1 ${
          !isValid ? 'bg-gray-400' : 'bg-green-700'
        }`}
      >
        <i className="fa-solid fa-paper-plane" />
      </button>
    </form>
  );
}
