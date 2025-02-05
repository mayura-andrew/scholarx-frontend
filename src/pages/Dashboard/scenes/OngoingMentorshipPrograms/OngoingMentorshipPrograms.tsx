import React, { useState, useMemo } from 'react';
import { useMentees } from '../../../../hooks/useMentees';
import { Routes, Route, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import UserIcon from '../../../../assets/svg/Icons/UserIcon';
import MentorMonthlyChecking from '../../../../components/MonthlyChecking/MentorMonthlyChecking';
import { ApplicationStatus } from '../../../../enums';
import { useMonthlyCheckIns } from '../../../../hooks/useSubmitCheckIn';
import { Mentee } from '../../../../types';
import MenteeProfile from '../../../MenteeProfile/MenteeProfile.component';

const OngoingMentorshipPrograms: React.FC = () => {
  const { data: mentees, isLoading } = useMentees();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'submitted', 'pending'

  const filteredMentees = useMemo(() => {
    let filtered =
      mentees?.filter(
        (mentee) => mentee.state === ApplicationStatus.APPROVED
      ) || [];

    if (searchTerm) {
      filtered = filtered.filter(
        (mentee) =>
          mentee.application.firstName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          mentee.application.lastName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus === 'submitted') {
      filtered = filtered.filter(
        (mentee) => (mentee.monthlyCheckIns?.length ?? 0) > 0
      );
    } else if (filterStatus === 'pending') {
      filtered = filtered.filter((mentee) => !mentee.monthlyCheckIns?.length);
    }

    return filtered;
  }, [mentees, searchTerm, filterStatus]);

  const stats = useMemo(() => {
    const total = filteredMentees.length;
    const submitted = filteredMentees.filter(
      (m) => (m.monthlyCheckIns?.length ?? 0) > 0
    ).length;
    const pending = total - submitted;
    return { total, submitted, pending };
  }, [filteredMentees]);

  const renderDashboard = () => (
    <div className="p-6">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Mentees</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">
            Submitted Check-ins
          </h3>
          <p className="text-3xl font-bold text-green-600">{stats.submitted}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">
            Pending Check-ins
          </h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
      </div>
      <p className="text-gray-600 text-center">
        Select a mentee to view their details
      </p>
    </div>
  );

  const renderFilters = () => (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search mentees..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <svg
          className="w-5 h-5 absolute left-3 top-3 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <select
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        value={filterStatus}
        onChange={(e) => {
          setFilterStatus(e.target.value);
        }}
      >
        <option value="all">All Mentees</option>
        <option value="submitted">With Check-ins</option>
        <option value="pending">Pending Check-ins</option>
      </select>
    </div>
  );

  const renderMenteeCard = (mentee: Mentee) => (
    <Link
      key={mentee.uuid}
      to={`/admin/dashboard/ongoing-mentorship-programs/${mentee.uuid}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition duration-200 mb-4"
    >
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {mentee.profile.image_url ? (
              <img
                src={mentee.profile.image_url}
                alt={mentee.application.firstName}
                className="w-12 h-12 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-gray-500" />
              </div>
            )}
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {mentee.application.firstName} {mentee.application.lastName}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  mentee.monthlyCheckIns?.length
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {mentee.monthlyCheckIns?.length
                  ? `${mentee.monthlyCheckIns.length} Check-ins`
                  : 'No Check-ins'}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Last submission:{' '}
              {mentee.monthlyCheckIns?.length
                ? new Date(
                    mentee.monthlyCheckIns[
                      mentee.monthlyCheckIns.length - 1
                    ].checkInDate
                  ).toLocaleDateString()
                : 'Never'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="md:w-1/3 p-6 border-r bg-white">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Mentee Check-ins
        </h2>
        {renderFilters()}
        <div className="h-[calc(100vh-280px)] overflow-y-auto">
          {filteredMentees.map(renderMenteeCard)}
          {filteredMentees.length === 0 && (
            <p className="text-center text-gray-500 py-4">No mentees found</p>
          )}
        </div>
      </div>
      <div className="flex-1">
        <Routes>
          <Route path=":menteeId" element={<AdminMenteeDetails />} />
          <Route path="/" element={renderDashboard()} />
        </Routes>
      </div>
    </div>
  );
};

const AdminMenteeDetails: React.FC = () => {
  const { menteeId } = useParams<{ menteeId: string }>();
  const { data: checkInHistory = [], isLoading } = useMonthlyCheckIns(
    menteeId ?? ''
  );

  return (
    <div className="p-6 space-y-6">
      <MenteeProfile />
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Monthly Check-ins
        </h2>
        <MentorMonthlyChecking
          menteeId={menteeId ?? ''}
          checkInHistory={checkInHistory}
          isLoading={isLoading}
          refetch={async () => {
            await Promise.resolve();
          }}
          isAdmin={true}
        />
      </div>
    </div>
  );
};

export default OngoingMentorshipPrograms;
