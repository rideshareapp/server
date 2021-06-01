// const router = require('express').Router();

// router.get('/test', (req: JSON, res: any) => {
//     res.send('Hello World!');
// });

// export const routes = (app: any) => {
//   app.use('/', router);

//   app.get('*', (req: JSON, res: any) => {
//     res.status(404).json({ message: 'not found' });
//   });

//   app.use((err: { type: string; }, req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; }, next: (arg0: any) => void) => {
//     if (err.type === 'entity.parse.failed') {
//       return res.status(400).json({ message: 'bad request' });
//     }
//     next(err);
//   });
// };