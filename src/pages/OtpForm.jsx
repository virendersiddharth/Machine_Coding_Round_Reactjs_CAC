import React, { useEffect, useRef, useState } from 'react'

const OtpForm = () => {
  const length = 4;
  const correctOtp = "1234"
  const [filledState, setFilledState] = useState("")
  const [combinedOtp, setCombinedOtp] = useState("")
  const [otp, setOtp] = useState(new Array(length).fill(""))

  const otpRef = useRef([]);

  useEffect(()=>{
    console.log(otpRef)
    if(otpRef.current[0]){
      otpRef.current[0].focus()
    }
  },[])

  const handleChange = (index, e) => {
    const value = e.target.value;
    if(e.target.value === "" || isNaN(value)){
      return;
    }

    const newOtp = [...otp];
    const newValue = value.substring(value.length - 1)
    newOtp[index] = newValue;

    if(value && index <= length - 1 && otpRef.current[index + 1]){
      otpRef.current[index + 1].focus()
    }
    const combinedOtpCode = newOtp.join('');
    setCombinedOtp(combinedOtpCode);
    setOtp(newOtp);
    if(combinedOtpCode.length === length && combinedOtpCode === correctOtp ){
      setFilledState("Success")
      otpRef.current[index].blur();
    }
    if(combinedOtpCode.length === length && combinedOtpCode !== correctOtp){
      setFilledState("Error")
      otpRef.current[index].blur();
    }
  }

  const handleOnClick = (index)=>{
    otpRef.current[index].setSelectionRange(1,1);
    if(index >= 0){
      otpRef.current[otp.indexOf("")].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if(e.key === 'Backspace' && index >= 0 ){
      const newOtp = [...otp];
      newOtp[index] = "";
      if(otpRef.current[index - 1]){
        otpRef.current[index-1].focus()
      }
      const combinedOtpCode = newOtp.join("");
      setCombinedOtp(combinedOtpCode);
      if(combinedOtpCode.length < length){
        setFilledState("")
      }
      setOtp(newOtp);
    }
  }

  return (
    <div className='min-h-screen w-full bg-otp-page-bg py-10'>
      <h1 className='text-[5rem] text-center font-[700] text-white'>Chai aur Code</h1>

      <div className='grid place-items-center mt-12' >
        <div className='bg-white py-6 px-20 rounded-xl flex flex-col gap-6 items-center max-w-3xl'>
          <h2 className='text-[2.5rem] font-[700] font-dmsans'>Mobile Phone Verification</h2>
          <p className='text-para text-[1.6rem] text-center font-dmsans'>Enter the 4-digit verification code that was sent to your phone number.</p>
            <form action="" className='w-[65%] flex flex-col gap-4'>
              <div className='flex justify-start gap-4 w-full'>
                {
                  otp.map((value, index)=>(
                    <input type="text" 
                      ref={(input) => (otpRef.current[index] = input)}
                      value={value}
                      onChange={(e)=>{handleChange(index, e)}} 
                      onClick={()=>{handleOnClick(index)}}
                      onKeyDown={(e)=>{handleKeyDown(index, e)}}
                      className={`${filledState === "Success" ? "border border-success":"border border-error"} ${filledState.length === 0 && "border border-white"} bg-[#DBE2EF] w-full h-[90px] rounded-md text-center text-2xl`}
                    />
                  ))
                }
              </div>
              {
                filledState.length === 0 &&
                <button className={`bg-blue-button w-full text-white text-[1.5rem] py-3 px-6 font-dmsans rounded-lg`}>Verify Account</button>
                }
                {
                  filledState.length > 0 &&
                <button className={`${filledState === "Success" ? "bg-success" : "bg-error"} bg-blue-button w-full text-white text-[1.5rem] py-3 px-6 font-dmsans rounded-lg`}>
                  {filledState === "Success" ? "Verified" : "Verification Failed" }
                </button>
              }
          
            </form>
          <p className='mb-10 text-para text-[1.5rem] font-dmsans'>Didn't receive code? <a href='#' className='text-black'>Resend</a></p>
        </div>
      </div>
    </div>
  )
}

export default OtpForm