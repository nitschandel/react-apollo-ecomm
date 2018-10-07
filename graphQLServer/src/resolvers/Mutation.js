const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function login(parent, args, ctx, info) {
  const user = await ctx.db.query.user({ where: { email: args.email } })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user,
  }
}

async function createProduct(parent, args, ctx, info) {
  const userId = getUserId(ctx)
  const product = await ctx.db.mutation.createProduct({
    data: args,
  })

  return product
}

async function editProduct(parent, args, ctx, info) {
  const userId = getUserId(ctx)
  let id = args.id;
  delete args.id;

  const product = await ctx.db.mutation.updateProduct({
    data: args,
    where: {id: id},
  })

  return product
}

module.exports = {
  login,
  createProduct,
  editProduct
}
