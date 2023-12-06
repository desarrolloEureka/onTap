
import { RecoverPasswordProps } from '@/types/recoverpassword';
import { TextField, Typography, Button } from '@mui/material'
import Container from '@mui/material/Container'
import React from 'react'

const RecoverPassword = ({ dictionary }: RecoverPasswordProps ) => {
    
    return (
  
      <div>
          <div className='tw-bg-[url("/images/loginBackground.png")]  '>
           
            <Container className="tw-bg-primary tw-shadow-md tw-pt-16 tw-rounded-2xl tw-h-[475px] tw-w-[794px] flex tw-justify-center  tw-justify-items-center tw-text-center tw-mt-[134px]">
              <h1 className=" tw-text-white tw-text-[26px]  ">
                {dictionary?.recoverPassword.mail}
              </h1>
              <TextField
                className="tw-h-[52px] tw-w-[386px] tw-text-sm tw-mt-[80px] "
                required
                id="outlined-required"
                label={dictionary?.recoverPassword.mail}
                defaultValue=""
                variant="outlined"
                InputProps={{ className: "tw-rounded-3xl" }}
              />
              <Typography
                className="tw-text-white tw-mt-3 tw-mr-80"
                variant="body2"
                color="textSecondary"
              >
                {dictionary?.recoverPassword.mail}
              </Typography>
              <Button className="tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white tw-mt-[65px]">
                {dictionary?.recoverPassword.next}
              </Button>
            </Container>
          </div>
        </div>
      
  
    )
  }

export default RecoverPassword