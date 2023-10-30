import React, { useState } from 'react';
import { Modal, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useMutation } from 'react-query';
import { useContext } from 'react';
import UserDetailContext from "../../context/UserDetailContext.js";
import { bookVisit } from '../../utils/api.js';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const BookingModal = ({opened, setOpened, email, propertyId}) => {

    const [value, setValue] = useState(null)
    const {userDetails : {token}, setUserDetails} = useContext(UserDetailContext)
    // console.log(token) eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklTb3c1aXh3OHVrMnA1UnlmeUJNMyJ9.eyJpc3MiOiJodHRwczovL2Rldi1jaHRkeGl5azBnaWh0eDVtLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwMzM4MTI2OTE3ODk2MDc2NTU5MCIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0OjgwMDAiLCJodHRwczovL2Rldi1jaHRkeGl5azBnaWh0eDVtLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2OTg1NzAxNzcsImV4cCI6MTY5ODY1NjU3NywiYXpwIjoiV0dCQklzckc0cnpLd3ExUGp2TzJKU0oxamlaR1BVNHYiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.L1-6bc7ewE5DmHPgcqEtxO-q80QHD19ySs2yxHdHz5oQ_5HA3i1mtPonTtDi2LFl_xuQDOiC7FpFbjK2KZpnUmbe3EBjsfJB2LW2iP-dHTzedpHxDw8tbtDGGICLWUBw-_PEIhalNJ8UqqWzij2_bfozD3NSU4sFFV9wlQLFbi_zi7JUkBcxL4GSuAemtXxTpsR7703E2yrOpMksKLYNku2V18-5rg6s_pS1K--V8o3QD-7GDvglG45KUQNJpx_qqYKGtJua1y3ugLmjwHm7S7JQ8KTr5XINF2A-7OO6UyVANqmfhkkvOu2JIEYktiXxyu_KoHXNVDoIJ4mK0k08Ig

    const handleBookingSuccess = () => {
        toast.success("You have booked your visit", {
            position: "bottom-right",
        });
        setUserDetails((prev) => ({
            ...prev,
            bookings: [
                ...prev.bookings,
                {
                    id: propertyId, 
                    date: dayjs(value).format('DD/MM/YYYY')
                }
            ]
        }))
    };

    const {mutate, isLoading} = useMutation({
        mutationFn: () => bookVisit(value, propertyId, email, token),
        onSuccess: () => handleBookingSuccess(),
        onError: ({response}) => toast.error(response.data.message),
        onSettled: () => setOpened(false)
    });

  return (
    <Modal
    opened={opened}
    onClose={() => setOpened(false)}
    title="Select your date of visit"
    >
        <div className='flexColCenter' style={{gap: "1rem"}}>
            <DatePicker value={value} onChange={setValue} minDate={new Date()}/>
            <Button disabled={!value || isLoading} onClick={() => mutate()}>
                Book Visit
            </Button>
        </div>
    </Modal>
  )
}

export default BookingModal