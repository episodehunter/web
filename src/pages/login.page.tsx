import { styled as miStyled, Tab, Tabs } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'the-react-router'
import { LoginForm } from '../components/auth/login-form'
import { RegisterForm } from '../components/auth/register-form'
import { useUser } from '../contexts/user-context'
import logoPath from '../logo96.png'
import { Routes } from '../routes'

export function LoginPage() {
  const { navigate, params } = useNavigation<{ type?: string }>()
  const [selectedTab, setSelectedTab] = useState(params.type === 'register' ? 1 : 0)
  const { auth } = useUser()
  useEffect(() => {
    if (auth.isSigndInUser()) {
      navigate(Routes.upcoming)
    }
  }, [])

  const handleTabChange = (_: unknown, newTab: number) => {
    setSelectedTab(newTab)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Logo src={logoPath} />
      <FormWrapper>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        {selectedTab === 0 ? (
          <LoginForm login={auth.login} />
        ) : (
          <RegisterForm register={auth.register} />
        )}
      </FormWrapper>
    </Container>
  )
}

const Logo = miStyled('img')(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block'
}))

const FormWrapper = miStyled('div')(({ theme }) => ({
  marginTop: theme.spacing(8),
  width: '100%'
}))
