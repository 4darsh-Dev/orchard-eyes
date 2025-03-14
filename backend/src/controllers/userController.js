import { prisma } from '../utils/prismaClient.js'

export const createUser = async (req, res) => {
  const { name, email } = req.body
  try {
    const user = await prisma.user.create({ data: { name, email } })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export const editUser = async (req, res) => {
  const { id } = req.params
  const { name, email } = req.body
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email }
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export const getUser = async (req, res) => {
  console.log('req received')
  try {
    const { email } = req.query
    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        Farm: {
          include: {
            Analysis: {
              orderBy: {
                dateTime: 'desc'
              },
              take: 1
            }
          }
        }
      }
    })
    console.log(user)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
