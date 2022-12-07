import { UsersService } from "./user.service"
import { compare, genSalt, hash } from 'bcrypt'
import { JWTService } from './jwt.service'
import { MailerServices } from "./mailer.service"
import Handlebars from 'handlebars'


export class AuthService {
    constructor() { }

    static async register(data: any) {
        try {
            const { profile, email, password, role } = data

            const candidate = await UsersService.getOneByEmail(email)
            if (candidate.data) {
                throw candidate
            }

            const salt = await genSalt(10)
            const encrypted = await hash(password, salt)
            const { user } = await UsersService.create({ profile, email, password: encrypted, role })
            const validateToken = JWTService.generate({ email, id: user?.id }, '15m')

            const mail = Handlebars.compile(`<!DOCTYPE html>
			<html lang="es">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>ToDoList</title>
			</head>
			<body>
            <h2>Gracias por crearte una cuenta</h2>
			Ingresa a este link para validar tu correo: <b>{{url}}</b>
			</body>
			</html>`);

            const link = `http://localhost:3000/auth/validate/${validateToken}`

            MailerServices.send(mail({ url: link }), email)

            return user

        } catch (error) {
            console.log(error)
            return null;
        }
    }

    static async login({ email, password }: any) {
        try {
            const { data } = await UsersService.getOneByEmail(email)

            if (!data) {
                throw data
            }

            const isValid = await compare(password, data.password)

            if (!isValid) {
                throw isValid
            }

            const { id, permission } = data
            const token = JWTService.generate({
                id,
                email,
                permission
            })

            return {
                success: true,
                token,
                data: {
                    email,
                    permission
                }
            }

        } catch (error) {
            console.log(error)
            return { error }
        }

    }

    static async validateEmail(token: string) {
        try {
            const payload = JWTService.verify(token);

            const { data } = await UsersService.getOneById(payload.id);

            if (!data) {
                return {
                    message: 'El token que estás usando es inválido',
                };
            }

            if (data.validated) {
                const mail = Handlebars.compile(`<!DOCTYPE html>
				<html lang="es">
				<head>
					<meta charset="UTF-8">
					<meta http-equiv="X-UA-Compatible" content="IE=edge">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Correo existente</title>
				</head>
				<body>
				Ya está validado el correo electrónico, {{name}}. BASTA!!!
				</body>
				</html>`);

                return mail({
                    name: data.profile?.firstname,
                });
            }

            await UsersService.update(payload.id, {
                validated: true,
            });

            const mail = Handlebars.compile(`<!DOCTYPE html>
			<html lang="es">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Document</title>
			</head>
			<body>
			Genial, validaste tu correo. Nos vemos pronto {{name}}
			</body>
			</html>`);

            return mail({
                name: data.profile?.firstname,
            });
        } catch (error) {
            const mail = Handlebars.compile(`<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Document</title>
			</head>
			<body>
			Hubo un error para validar tu correo, volve a intentarlo
			</body>
			</html>`);

            return mail({});
        }
    }

}