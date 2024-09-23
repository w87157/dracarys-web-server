export const corsMiddle = (req: any, res: any, next: any) => {
  console.log('corsMiddle跨域中間件');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
  );
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.headers.origin) {
    if (req.headers.origin.indexOf('http://localhost') !== -1) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    } else {
      const allowOrigin = ['http://192.168.*.*', 'http://192.168.0.88:3000'];
      if (allowOrigin.includes(req.headers.origin)) {
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      } else {
        console.log('非法源！');
      }
    }
  } else {
    console.log('未提供來源！');
  }

  if (req.method === 'OPTIONS') {
    res.send('ok');
  } else {
    next();
    console.log('corsMiddle中間件通過！');
  }
};
