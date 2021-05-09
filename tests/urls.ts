require('dotenv').config()

export const baseUrl: string = {
  production: 'https://theblackhart.co.uk',
  preview: process.env.VERCEL_URL,
  development: 'http://localhost:3000',
}[process.env.VERCEL_ENV]

export const socialUrl = `${baseUrl}/social`
export const blogUrl = `${baseUrl}/blog`
export const shopUrl = `${baseUrl}/shop`
export const basketUrl = `${shopUrl}/basket`
export const legalUrl = `${baseUrl}/legal`
export const commissionsUrl = `${baseUrl}/commissions`
