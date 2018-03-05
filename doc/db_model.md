# User

## 数据库模型 (\*/models.js)

| 属性名       | 类型    | 必须 | 唯一 | 默认值     | 含义           |
| ------------ | ------- | ---- | ---- | ---------- | -------------- |
| username     | String  | yes  | yes  |            | 工号           |
| fullname     | String  | yes  |      |            | 名字           |
| gender       | String  |      |      | MALE       | 性别           |
| role         | String  |      |      | STAFF      | 角色           |
| phone        | String  |      |      |            | 电话           |
| active       | Boolean |      |      | true       | 活跃           |
| created      | Date    |      |      | Date.now() | 创建日期       |
| license      | String  |      |      |            | 驾驶证号       |
| cert         | String  |      |      |            | 上岗证号       |
| cert_expired | Date    |      |      |            | 上岗证过期日期 |
| id_front     | String  |      |      |            | 身份证正面     |
| id_back      | String  |      |      |            | 身份证反面     |

## 数据库接口 (\*/services.js)

| 接口名               | 输入参数                   | 输出       | 含义                       |
| -------------------- | -------------------------- | ---------- | -------------------------- |
| createUser           | user, callback             |            | 创建用户                   |
| getUsersByQuery      | query                      | Observable | 根据查询条件批量获取用户   |
| getUserByQuery       | query                      | Observable | 根据查询条件获取单个用户   |
| getAllUsers          |                            | Observable | 获取所有用户               |
| getUsersWithPg       | pageNumber, pageSize       | Observable | 获取相关页面的用户         |
| getUsersByRoleWithPg | pageNumber, pageSize, role | Observable | 根据权限获取相关页面的用户 |
| getUserByUsername    | username                   | Observable | 根据工号获取用户           |
| deleteUserByUsername | username                   | Observable | 根据工号删除用户           |
| updateUserByQuery    | query,update               | Observable | 根据工号更新用户           |
