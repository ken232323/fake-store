import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mantine/core'

const Inventory = () => {
  return (
    <div>
      <h1>Invetory page</h1>
      <Button component={Link} to="/Inventory/AddProduct">Add Product</Button>
    </div>
  )
}

export default Inventory
