/**
 * categoryController — public read + admin write for categories.
 */
const { Op } = require('sequelize')
const slugify = require('../utils/slugify')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const { Category, Course } = require('../models')

const slugifyName = (name) =>
  slugify(name, { lower: true, strict: true })

const listCategories = asyncHandler(async (req, res) => {
  const { search } = req.query
  const where = {}
  if (search) where.name = { [Op.iLike]: `%${search}%` }

  const categories = await Category.findAll({
    where,
    include: [{ model: Course, as: 'courses', attributes: ['id', 'status'] }],
  })
  res.json(categories)
})

const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id)
  if (!category) throw ApiError.notFound('Category not found')
  res.json(category)
})

const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, description } = req.body
  const category = await Category.create({
    name,
    slug: slug || slugifyName(name),
    description,
  })
  res.status(201).json(category)
})

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id)
  if (!category) throw ApiError.notFound('Category not found')

  const { name, slug, description } = req.body
  if (name !== undefined) category.name = name
  if (slug !== undefined) category.slug = slug
  if (description !== undefined) category.description = description
  await category.save()

  res.json(category)
})

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id)
  if (!category) throw ApiError.notFound('Category not found')

  const courseCount = await Course.count({ where: { categoryId: category.id } })
  if (courseCount > 0) {
    throw ApiError.conflict(
      'Cannot delete a category that still has courses assigned'
    )
  }

  await category.destroy()
  res.json({ message: 'Category deleted' })
})

module.exports = {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}
