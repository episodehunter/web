import { captureException } from '@sentry/browser'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ResetPassword } from '../components/auth/reset-password'
import { useAuth } from '../global-context'
import { shark } from '../utils/colors'
import { media } from '../styles/media-queries'

export function AuthAction() {
  const [mode, setMode] = useState('')
  const [oobCode, setOobCode] = useState('')
  const auth = useAuth()

  useEffect(() => {
    const currentUrl = new URL(document.location.href)
    const searchParams = currentUrl.searchParams
    setMode(searchParams.get('mode') || '')
    setOobCode(searchParams.get('oobCode') || '')
  }, [document.location.href])

  if (mode === 'resetPassword') {
    return (
      <Wrapper>
        <FormWrapper>
          <ResetPassword
            code={oobCode}
            resetPassword={newPassword => auth.resetPassword(oobCode, newPassword)}
          />
        </FormWrapper>
      </Wrapper>
    )
  } else {
    captureException(new Error('Wrong mode: ' + JSON.stringify(mode)))
    return null
  }
}

const FormWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 80%;
  ${media.tabletAndUp`
    width: 40%;
  `}
`

const Wrapper = styled.div`
  height: 100%;
  background-color: ${shark};
  display: flex;
  flex-direction: column;
  align-items: center;
`
