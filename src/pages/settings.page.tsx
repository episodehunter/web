import * as React from 'react'
import styled from 'styled-components'
import { shark, alabaster } from '../utils/colors';

export const SettingsPage = () => <Wrapper>SETTINGS</Wrapper>

const Wrapper = styled.div`
  padding-top: 70px;
  height: 100%;
  color: ${alabaster};
  background-color: ${shark};
  display: flex;
  justify-content: center;
`
