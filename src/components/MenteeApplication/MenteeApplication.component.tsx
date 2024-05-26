import React from 'react';
import { type Mentee } from '../../types';

interface MenteeApplicationProps {
  isLoading: boolean;
  mentee: Mentee | null | undefined;
  onStateChange: (newState: string) => void;
}

const MenteeApplication: React.FC<MenteeApplicationProps> = ({
  isLoading,
  mentee,
  onStateChange,
}) => {
  const handleStateChange = (newState: string) => {
    onStateChange(newState);
  };

  const getStateColor = (state: string | undefined) => {
    switch (state) {
      case 'pending':
        return 'bg-blue-100 text-blue-700';
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Skeleton</div>
      ) : (
        <div className="w-full space-y-8">
          <div className="flex items-center">
            <img
              src={mentee?.profile.image_url}
              alt=""
              className="w-28 rounded-full object-fill"
            />
            <div className="ml-5">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-semibold">
                  {mentee?.application.firstName} {mentee?.application.lastName}
                </span>
                <span
                  className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm ${getStateColor(
                    mentee?.state
                  )}`}
                >
                  {mentee?.state}
                </span>
              </div>
              <span className="text-xl font-light">
                {mentee?.application.isUndergrad === false
                  ? `${mentee?.application.university ?? ''}`
                  : `${mentee?.application.position ?? ''}, ${
                      mentee?.application.company ?? ''
                    }`}
              </span>
            </div>
            <div className="ml-auto flex overflow-hidden">
              <button
                className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-primary-blue border-primary-blue focus:outline-none focus:ring"
                onClick={() => {
                  handleStateChange('approved');
                }}
              >
                Approve
              </button>
              <button
                className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-red-500 border-red-500 focus:outline-none focus:ring"
                onClick={() => {
                  handleStateChange('rejected');
                }}
              >
                Reject
              </button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-10">
            <div className="col-span-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-base font-bold">Course</h3>
                  <p>{mentee?.application.course}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">University</h3>
                  <p>{mentee?.application.university}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">
                    {mentee?.application.isUndergrad === true
                      ? 'Year of Study'
                      : 'Graduated Year'}
                  </h3>
                  <p>
                    {mentee?.application.isUndergrad === true
                      ? mentee?.application.yearOfStudy
                      : mentee?.application.graduatedYear}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2 pl-8 border-l">
              <div className="grid grid-cols-2 gap-1">
                <a
                  href={mentee?.application.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="underline mb-2"
                >
                  CV
                </a>
              </div>
            </div>
            <div className="col-span-5">
              <div className="mb-4">
                <h3 className="text-base font-bold">Submission</h3>
                <a
                  href={mentee?.application.submission}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Click here to view
                </a>
              </div>
            </div>
            <div className="col-span-3">
              <div className="mb-4">
                <h3 className="text-base font-bold">Applied Mentor</h3>
                {/* TODO: Make this a spearate component */}
                <div className="rounded-xl border-2 mt-2 border-gray-100 bg-white flex items-start gap-4 p-4">
                  <img
                    src={mentee?.mentor.profile.image_url}
                    className="w-14 rounded-full object-cover"
                    alt=""
                  />
                  <div>
                    <h3 className="font-medium sm:text-lg">
                      <a
                        href="#"
                        className="hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {mentee?.mentor.application.firstName}{' '}
                        {mentee?.mentor.application.lastName}
                      </a>
                    </h3>
                    <p className="line-clamp-2 text-sm text-gray-700">
                      {mentee?.mentor.application.position},{' '}
                      {mentee?.mentor.application.institution}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenteeApplication;
