import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@mantine/core'


const Settings = () => {
    
  return (
    <div>
      <h1>SETTINGS PAGE</h1>
      <Card component={Link} to="/Inventory">click me</Card>
    </div>
  )
}

export default Settings
