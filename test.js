// 导入 SDK, 当 TOS Node.JS SDK 版本小于 2.5.2 请把下方 TosClient 改成 TOS 导入
import { TosClient, TosClientError, TosServerError } from '@volcengine/tos-sdk';
import https from 'https';

// 创建客户端
const client = new TosClient({
  accessKeyId: "xxx",
  accessKeySecret: "xxx",
  region: "cn-beijing", // 填写 Bucket 所在地域。以华北2（北京)为例，则 "Provide your region" 填写为 cn-beijing。
  endpoint: "tos-cn-beijing.volces.com", // 填写域名地址
});

function handleError(error) {
  if (error instanceof TosClientError) {
    console.log('Client Err Msg:', error.message);
    console.log('Client Err Stack:', error.stack);
  } else if (error instanceof TosServerError) {
    console.log('Request ID:', error.requestId);
    console.log('Response Status Code:', error.statusCode);
    console.log('Response Header:', error.headers);
    console.log('Response Err Code:', error.code);
    console.log('Response Err Msg:', error.message);
  } else {
    console.log('unexpected exception, message: ', error);
  }
}

async function main() {
  try {
    const bucketName = 'dms-wanyix';
    const objectName = 'Users/bytedance/0807.xlsx';
    // 从网络流中获取数据
    const req = https.get('https://www.volcengine.com/');
    const res = await new Promise((resolve) => req.on('response', resolve));
    // 上传对象
    await client.putObject({
      bucket: bucketName,
      key: objectName,
      body: res,
      contentType: "text/xxxx"
    });

    // 查询刚刚上传对象的大小
    const { data } = await client.headObject({
      bucket: bucketName,
      key: objectName,
    });
    console.log('object size:', data['content-length']);
  } catch (error) {
    handleError(error);
  }
}

main();
