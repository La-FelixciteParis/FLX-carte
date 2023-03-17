export const CreateToken = async()=>{
    
    const request = await fetch('https://api.helloasso.com/oauth2/token',{
        method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    })

    const response = await request.json()
    console.log(response);
    
}