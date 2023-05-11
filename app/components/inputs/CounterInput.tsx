'use client';
import { FC, useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterInputProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const CounterInput: FC<CounterInputProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [value, onChange]);
  return (
    <div className="flex flex-row items-center  justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-500">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
          onClick={onReduce}
        >
          <AiOutlineMinus size={20} />
        </div>
        <div className="text-2xl font-light">{value}</div>
        <div
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
          onClick={onAdd}
        >
          <AiOutlinePlus size={20} />
        </div>
      </div>
    </div>
  );
};

export default CounterInput;
