// const administratorPermissions = {
//     REGISTER_USER: '/user/signUp',
//     CHANGE_USER_STATUS: '/user/status'
// }
// // it is not valid  it is example of admin permissions

// export const validateJWT = (administratorService) => {
//     return async (req, res, next) => {
//         try {
//             const payload = jsonwebtoken.verify(req.headers.authorization, process.env.SECRET_KEY)
//             const admin = await administratorService.getUser(payload.user.id)
//             const permissionsList = admin.administratorRole.permissionsList
//             const requestedPath = req.originalUrl
//             Object.keys(administratorPermissions).map(key => {
//                 if (requestedPath.startsWith(administratorPermissions[key])) {
//                     if (!permissionsList[key]) {
//                         console.log('PERMISSION_ERROR')
//                         throw new Error('PERMISSION_ERROR')
//                     }
//                 }
//             })
//             req.adminInfo = admin
//             return next()
//         } catch (error) {
//             res.status(403).json(Utils.errorHandler({isJWT: true }, error.message.toString()));
//         }
//     }
// };