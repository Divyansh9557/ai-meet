
import Image from "next/image"




const ProcessingState = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 text-center bg-white rounded-xl shadow-md border">
      {/* Illustration */}
      <div className="mb-6">
        <Image
          src="/processing.svg"
          alt="Not started"
          width={200}
          height={100}
          className="mx-auto"
        />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-2 text-gray-900">
        Meeting Completed
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-500 max-w-md mb-6">
        This meeting was completed . a summary will appear soon
      </p>
    </div>
  );
};

export default ProcessingState