const { getUserId } = require('../utils')

async function users(parent, args, ctx, info) {

  const allUsers = await ctx.db.query.users({})
  const count = allUsers.length

  return {
    users: allUsers,
    count
  }
}

async function products(parent, args, ctx, info) {

  const allProducts = await ctx.db.query.products({})
  const count = allProducts.length

  return {
    products: allProducts,
    count
  }
}

async function getUser(parent, args, ctx, info) {
  const userId = getUserId(ctx)
  const user = await ctx.db.query.user({ where: { id: userId } })
  if (!user) {
    throw new Error('No such user found')
  }

  return user
}

async function getProduct(parent, args, ctx, info) {
  const product = await ctx.db.query.products({where: { id: args.id}})

  return product[0]
}

module.exports = {
  users,
  products,
  user:getUser,
  product: getProduct
}
