import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Model from 'App/Models/Auth'

export default class AuthController {
  public async processLogin(auth, request) {
    const newUserSchema = schema.create({
      universal: schema.string(),
      password: schema.string()
    })

    const payload = await request.validate({ schema: newUserSchema })
    const token = await auth.use('api').attempt(payload.universal, payload.password, {
      expiresIn: '7days'
    })

    return token
  }

  public async processRegister(request) {
    const newUserSchema = schema.create({
      email: schema.string([
        rules.email()
      ]),
      password: schema.string([
        rules.confirmed(),
        rules.minLength(4)
      ])
    })

    const payload = await request.validate({ schema: newUserSchema })
    const auth = await Model.create({
      email: payload.email,
      password: payload.password,
    })

    return auth
  }
}
