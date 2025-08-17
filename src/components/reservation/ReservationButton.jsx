import { useState } from 'react';
import { Calendar, MessageCircle } from 'lucide-react';
import Button from '../common/Button';
import ReservationSystem from './ReservationSystem';

const ReservationButton = ({ 
  packageData = null, 
  text = "Fazer Reserva", 
  variant = "primary",
  size = "lg",
  className = "",
  icon = true 
}) => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const openReservation = () => {
    setIsReservationOpen(true);
  };

  const closeReservation = () => {
    setIsReservationOpen(false);
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={openReservation}
        className={`flex items-center ${className}`}
      >
        {icon && <Calendar size={20} className="mr-2" />}
        {text}
      </Button>

      <ReservationSystem
        packageData={packageData}
        isOpen={isReservationOpen}
        onClose={closeReservation}
      />
    </>
  );
};

export default ReservationButton;
