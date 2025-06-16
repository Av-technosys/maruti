import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

function CustomInputNumber({ label, phone, setPhone }) {
  return (
    <div className=" flex flex-col gap-1.5 mb-3">
      <p className=" font-medium">{label}</p>
      <PhoneInput
        inputClassName={`!border !border-gray-200 !w-full !h-10 !font-medium !text-[16px] !max-w-none !rounded-r-lg`}
        countrySelectorStyleProps={{
          className: `[&>button]:border [&>button]:!p-2 [&>button]:pl-2.5 [&>button]:!h-10 [&>button]:!border-gray-200 [&>button]:!rounded-l-lg`,
        }}
        value={phone}
        onChange={(value, meta) => {
          setPhone(value);
        }}
      />
    </div>
  );
}

export default CustomInputNumber;
