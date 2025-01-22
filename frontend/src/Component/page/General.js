import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import Card from '../Member/Card';
import axios from 'axios';
import Loader from '../Loader';
import { ArrowLeft } from 'lucide-react';
import RevenueDashboard from './RevenueDashboard';
import PaymentChart from './PaymentChart';
import MonthlyRevenue from './MonthlyRevenue';

const General = () => {
  const { page } = useParams();
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revenue, setRevenue] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(false);
  const [expire ,setexpire] = useState(false);
  const [paymentMatrix, setPaymentMatrix] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all members
    const fetchMembers = async () => {
      try {
        const res = await axios.get('http://localhost:4000/members/get-members', { withCredentials: true });
        setMembers(res.data.members);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching members:', error.message);
        setLoading(false);
      }
    };

    fetchMembers();
  }, [page]);


  const [monthlyRevenue, setMonthlyRevenue] = useState(null);

  // Fetch monthly revenue from API
  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        const response = await axios.get('http://localhost:4000/general/monthly-revenue');
        setMonthlyRevenue(response.data.totalMonthlyCollection); // Assuming the API returns totalRevenue
      } catch (error) {
        console.error("Error fetching monthly revenue:", error);
      }
    };
    fetchMonthlyRevenue();
  }, []);


  useEffect(() => {
    // Filter members based on category
    const filterMembers = () => {
      const today = new Date();

      switch (page) {
        case 'Expire-in-3-Days':
          setexpire(true);
          setFilteredMembers(
            members.filter((member) => {
              const paymentDate = new Date(member.nextPaymentDate);
              const diffInDays = Math.ceil((paymentDate - today) / (1000 * 60 * 60 * 24));
              return diffInDays <= 3 && diffInDays >= 0;
            })
          );
          // setexpire(false);
          break;
        case 'Expire-in-4-to-7-Days':
          setexpire(true);
          setFilteredMembers(
            members.filter((member) => {
              const paymentDate = new Date(member.nextPaymentDate);
              const diffInDays = Math.ceil((paymentDate - today) / (1000 * 60 * 60 * 24));
              return diffInDays > 3 && diffInDays <= 7;
            })
          );
          break;
        case 'Expired':
          setexpire(true);
          setFilteredMembers(
            members.filter((member) => {
              const paymentDate = new Date(member.nextPaymentDate);
              return paymentDate < today;
            })
          );
          break;
        case 'Payment-Matrix':
          setPaymentMatrix(true);
          
          break;
        case 'Months-Revenue':
          setRevenue(true);
          setFilteredMembers(
            members.filter((member) => {
              const joinDate = new Date(member.joiningdate);
              const today = new Date();
              return (
                joinDate.getMonth() === today.getMonth() &&
                joinDate.getFullYear() === today.getFullYear()
              );
            })
          );
          break;
        case 'Total-Revenue':
          setTotalRevenue(true);
          setFilteredMembers(members);
          break;
        // Implement logic for revenue filtering
        default:
          setFilteredMembers(members); // Default to all members
          break;
      }
    };

    filterMembers();
  }, [page, members]);

  // Handle card click for member details page
  const handleCardClick = (member) => {
    navigate(`/member/${member._id}`);
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className='m-4'>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-500 transition duration-300"
        >
          <ArrowLeft size={20} />
          <span>Go Back</span>
        </button>
      </div>
      <h2 className="text-2xl font-semibold text-textPrimary mb-1 ml-4">
        {page === 'Expire-in-3-Days' && 'Members Expiring in 3 Days'}
        {page === 'Expire-in-4-to-7-Days' && 'Members Expiring in 4 to 7 Days'}
        {page === 'Expired' && 'Expired Members'}
        {/* {page === 'Months-Revenue' && 'Monthly Revenue'} */}
        {/* {page === 'Total-Revenue' && 'Total Revenue'} */}
      </h2>

      {/* Expiring Members */}
      {expire && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredMembers.map((member) => (
          <div key={member._id} onClick={() => handleCardClick(member)} >
            <Card key={member._id} member={member} onDelete={(id) => alert("Go to Members Section for Deletion")} />
          </div>
        ))}

        {filteredMembers.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No members found.
          </p>
        )}
      </div>}

      {/* Payment Matrix */}
        {paymentMatrix && <PaymentChart memberData={members}/>}

        {/* Monthly Revenue  */}
        {revenue && <MonthlyRevenue monthlyRevenue={monthlyRevenue} members={filteredMembers} />}

        {/* Total Revenue */}
      {totalRevenue && <RevenueDashboard />}
    </>
  );
};

export default General;
