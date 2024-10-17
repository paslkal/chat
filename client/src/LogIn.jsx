import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { useState } from "react";

const host = 'server'
const port = 5000

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://${host}:${port}/login`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {"Content-Type": 'application/json'}
      })

      const user = response.json()

      console.log(user)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Sheet
      sx={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Sheet
        sx={{
          width: 300,
          mx: "auto",
          my: 4,
          py: 3,
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant='outlined'
      >
        <div>
          <Typography
            level='h4'
            component='h1'
          >
            <strong>Welcome 👋</strong>
          </Typography>
          <Typography level='body-sm'>
            Log in for an account.
          </Typography>
        </div>
        <form onSubmit={handleSubmit} style={{display: 'contents'}}>
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input
              name='email'
              type='email'
              placeholder='johndoe@email.com'
              value={email}
              onChange={handleEmail}
            />
          </FormControl>
          <FormControl required>
            <FormLabel>
              Password
            </FormLabel>
            <Input
              name='password'
              type='password'
              placeholder='password'
              value={password}
              onChange={handlePassword}
            />
          </FormControl>

          <Button sx={{ mt: 1 }} type="submit">
            Log in
          </Button>
        </form>
        <Typography
          endDecorator={
            <Link href='/signup'>
              Sing up
            </Link>
          }
          sx={{
            fontSize: "sm",
            alignSelf: "center",
          }}
        >
          Don't have an account?
        </Typography>
      </Sheet>
    </Sheet>
  );
}
