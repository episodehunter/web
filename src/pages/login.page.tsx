import { styled as miStyled, Tab, Tabs } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { useOnMount } from '../utils/use-on-mount'
import React, { useState } from 'react'
import { useNavigation } from 'the-react-router'
import { motion } from 'framer-motion'
import { LoginForm } from '../components/auth/login-form'
import { RegisterForm } from '../components/auth/register-form'
import { useUser } from '../contexts/user-context'
import logoPath from '../logo96.png'
import { Routes } from '../routes'

const animationVariants = {
  show: { opacity: 1, x: 0 },
  hide: { opacity: 0, y: '100%' },
}

export function LoginPage() {
  const { navigate, params } = useNavigation<{ type?: string }>()
  const [selectedTab, setSelectedTab] = useState(params.type === 'register' ? 1 : 0)
  const [hidePage, setHidePage] = useState(false)
  const { auth } = useUser()
  useOnMount(async () => {
    if (await auth.isSigndInUser()) {
      navigate(Routes.upcoming)
    }
  })

  const handleTabChange = (_: unknown, newTab: number) => {
    setSelectedTab(newTab)
  }

  return (
    <Container style={{ marginBottom: '100px' }} component="main" maxWidth="xs">
      <motion.div
        transition={{ duration: 0.5 }}
        animate={hidePage ? 'hide' : 'show'}
        variants={animationVariants}
      >
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
            <LoginForm login={auth.login} hideForm={() => setHidePage(true)} />
          ) : (
            <RegisterForm register={auth.register} hideForm={() => setHidePage(true)} />
          )}
        </FormWrapper>
      </motion.div>
    </Container>
  )
}

const Logo = miStyled('img')(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
}))

const FormWrapper = miStyled('div')(({ theme }) => ({
  marginTop: theme.spacing(8),
  width: '100%',
}))
