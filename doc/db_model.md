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
| certExpired | Date    |      |      |            | 上岗证过期日期 |
| idFront     | String  |      |      |            | 身份证正面     |
| idBack      | String  |      |      |            | 身份证反面     |

## 数据库接口 (\*/services.js)

| 接口名               | 输入参数                                                                                            | 输出       | 含义                           |
| -------------------- | --------------------------------------------------------------------------------------------------- | ---------- | ------------------------------ |
| createUser           | user:Object, callback                                                                               |            | 创建用户                       |
| getUsersByQuery      | query                                                                                               | Observable | 根据查询条件批量获取用户       |
| getUserByQuery       | query                                                                                               | Observable | 根据查询条件获取单个用户       |
| getAllUsers          |                                                                                                     | Observable | 获取所有用户                   |
| getUsersWithPg       | pageNumber:Number,<br>pageSize:Number,<br>[values: {role: enum, fromDate: String, toDate: String}] | Observable | 根据查询参数获取具体页面的用户 |
| getUserByUsername    | username: String                                                                                    | Observable | 根据工号获取用户               |
| deleteUserByUsername | username: String                                                                                    | Observable | 根据工号删除用户               |
| updateUserByUsername | username:String,update:Object                                                                       | Observable | 根据工号更新用户               |
| resetPassword        | username:String,password:String                                                                     |            | 重置用户密码                   |

# Company

## 数据库模型 (\*/models.js)

| 属性名       | 类型    | 必须 | 唯一 | 默认值     | 含义         |
| ------------ | ------- | ---- | ---- | ---------- | ------------ |
| name         | String  | yes  |      |            | 公司名称     |
| addr         | String  | yes  |      |            | 公司地址     |
| phone        | String  |      |      |            | 公司电话     |
| legalPerson | String  |      |      |            | 公司法人代表 |
| taxNumber   | String  |      |      |            | 纳税号       |
| active       | Boolean |      |      |            | 活跃         |
| created      | Date    |      |      | Date.now() | 创建日期     |

## 数据库接口 (\*/services.js)

| 接口名             | 输入参数                                                                       | 输出       | 含义                         |
| ------------------ | ------------------------------------------------------------------------------ | ---------- | ---------------------------- |
| createCompany      | company:Object                                                                 | Observable | 创建公司                     |
| getAllCompanies    |                                                                                | Observable | 获取所有公司                 |
| getCompaniesWithPg | pageNumber:Number,<br>pageSize:Number,<br>[values:{fromDate:Date,toDate:Date}] | Observable | 根据查询条件获取具体页面公司 |
| getCompanyById     | id:ObjectId                                                                    | Observable | 根据 id 获取公司             |
| updateCompanyById  | id:ObjectId                                                                    | Observable | 根据 id 更新公司             |
| deleteCompanyById  | id:ObjectId                                                                    | Observable | 根据 id 删除公司             |

# Product

## 数据库模型 (\*/models.js)

| 属性名        | 类型               | 必须 | 唯一 | 默认值     | 含义     |
| ------------- | ------------------ | ---- | ---- | ---------- | -------- |
| name          | String             | yes  |      |            | 产品名称 |
| specs         | String             | yes  |      |            | 产品规格 |
| pricing       | Number             |      |      |            | 当前价格 |
| priceHistory | [**priceHistory**] |      |      |            | 历史价格 |
| active        | Boolean            |      |      |            | 活跃     |
| created       | Date               |      |      | Date.now() | 创建日期 |

### priceHistory 子模型

| 属性名 | 类型   | 必须 | 唯一 | 默认值 | 含义             |
| ------ | ------ | ---- | ---- | ------ | ---------------- |
| price  | Number | yes  |      |        | 产品价格         |
| start  | Date   | yes  |      |        | 价格执行开始日期 |
| end    | Date   | yes  |      |        | 价格执行结束日期 |

## 数据库接口 (\*/services.js)

| 接口名                    | 输入参数                              | 输出       | 含义                 |
| ------------------------- | ------------------------------------- | ---------- | -------------------- |
| createProduct             | product:Object                        | Observable | 创建产品             |
| getAllProducts            |                                       | Observable | 获取所有产品         |
| getProductsWithPg         | pageNumber:Number,<br>pageSize:Number | Observable | 获取具体页面产品     |
| getProductById            | id:ObjectId                           | Observable | 根据 id 获取产品     |
| updateProductById         | id:ObjectId                           | Observable | 根据 id 更新产品     |
| deleteProductById         | id:ObjectId                           | Observable | 根据 id 删除产品     |
| addProductPriceHistory    | id:ObjectId,priceHistory:Object       | Observable | 添加历史价格         |
| deleteProductPriceHistory | id:ObjectId,childId:ObjectId          | Observable | 根据 id 删除历史价格 |

# Vehicle

## 数据库模型 (\*/models.js)

| 属性名        | 类型           | 必须 | 唯一 | 默认值     | 含义     |
| ------------- | -------------- | ---- | ---- | ---------- | -------- |
| plate         | String         | yes  |      |            | 车辆车牌 |
| engine        | String         | yes  |      |            | 发动机号 |
| model         | String         |      |      |            | 车辆型号 |
| purchaseDate | Date           |      |      |            | 购买时间 |
| initMile     | Number         |      |      | 0          | 初始里程 |
| principal     | **User**       |      |      |            | 第一司机 |
| secondary     | **User**       |      |      |            | 第二司机 |
| captain       | **User**       |      |      |            | 所属队长 |
| assigned      | Boolean        | yes  |      | false      | 是否指派 |
| active        | Boolean        |      |      | true       | 是否活跃 |
| created       | Date           |      |      | Date.now() | 创建日期 |
| fuels         | [**Fuel**]     |      |      |            | 加油记录 |
| maintenance   | [**Maintain**] |      |      |            | 维修记录 |

### Fuel 子模型

| 属性名    | 类型     | 必须 | 唯一 | 默认值     | 含义     |
| --------- | -------- | ---- | ---- | ---------- | -------- |
| applicant | **User** |      |      |            | 申请人   |
| litre     | Number   | yes  |      |            | 加油升数 |
| cost      | Number   | yes  |      |            | 加油开销 |
| mile      | Number   |      |      |            | 里程数   |
| date      | Date     |      |      | Date.now() | 加油日期 |
| isCheck  | Boolean  |      |      | false      | 是否审核 |
| info      | String   |      |      |            | 情况说明 |

### Maintain 子模型

| 属性名    | 类型     | 必须 | 唯一 | 默认值     | 含义     |
| --------- | -------- | ---- | ---- | ---------- | -------- |
| applicant | **User** |      |      |            | 申请人   |
| reason    | String   | yes  |      |            | 维修原因 |
| cost      | Number   | yes  |      |            | 维修开销 |
| mile      | Number   |      |      |            | 里程数   |
| date      | Date     |      |      | Date.now() | 维修日期 |
| detail    | String   |      |      | 维修原因   |
| isCheck  | Boolean  |      |      | false      | 是否审核 |
| info      | String   |      |      |            | 情况说明 |

## 数据库接口 (\*/services.js)

| 接口名                   | 输入参数                                              | 输出       | 含义                 |
| ------------------------ | ----------------------------------------------------- | ---------- | -------------------- |
| createVehicle            | vehicle:Object                                        | Observable | 创建车辆             |
| getAllVehicles           |                                                       | Observable | 获取所有车辆         |
| getVehiclesWithPg        | pageNumber:Number,<br>pageSize:Number,<br>[values:{driver:String, captain:String,fromDate:String,toDate:String}]                 | Observable | 根据查询获取具体页面车辆     |
| getVehicleById           | id:ObjectId                                           | Observable | 根据 id 获取车辆     |
| deleteVehicleById        | id:ObjectId                                           | Observable | 根据 id 删除车辆     |
| updateVehicleById        | id:ObjectId                                           | Observable | 根据 id 更新车辆     |
| addVehicleFuel           | id:ObjectId,fuelArray:[Object]                        | Observable | 添加加油记录         |
| addVehicleMaintain       | id:ObjectId,maintainArray:[Object]                    | Observable | 添加维修记录         |
| deleteVehicleFuel        | vehicleId:ObjectId,fuelId:ObjectId                    | Observable | 删除车辆加油记录     |
| deleteOwnFuel            | username:String,fuelId:ObjectId                       | Observable | 删除个人加油记录     |
| deleteVehicleMaintain    | vehicleId:ObjectId,maintainId:ObjectId                | Observable | 删除车辆维修记录     |
| deleteOwnMaintain        | username:String,maintainId:ObjectId                   | Observable | 删除个人维修记录     |
| checkFuelById            | username:String,fuelId:ObjectId                       | Observable | 审核加油记录         |
| checkMaintainById        | username:String,maintainId:ObjectId                   | Observable | 审核维修记录         |

# Transport

## 数据库模型 (\*/models.js)

| 属性名            | 类型        | 必须 | 唯一 | 默认值     | 含义         |
| ----------------- | ----------- | ---- | ---- | ---------- | ------------ |
| assigner          | **User**    |      |      |            | 指派队长     |
| vehicle           | **Vehicle** |      |      |            | 指派车辆     |
| principal         | **User**    |      |      |            | 第一司机     |
| secondary         | **User**    |      |      |            | 第二司机     |
| from:<br>company  | **Company** |      |      |            | 出发公司     |
| from:<br>weight   | Number      |      |      | 0          | 出发重量     |
| from:<br>date     | Date        |      |      | Date.now() | 出发日期     |
| to:<br>company    | **Company** |      |      |            | 送达公司     |
| to:<br>weight     | Number      |      |      | 0          | 送达重量     |
| to:<br>date       | Date        |      |      | Date.now() | 送达日期     |
| product           | **Product** |      |      |            | 产品信息     |
| captainStatus    | String      |      |      | ASSIGN     | 队长运输状态 |
| captainInfo      | String      |      |      |            | 队长说明     |
| price             | Number      | yes  |      | 0          | 运输价格     |
| accountantStatus | String      | yes  |      | SUBMIT     | 会计运输状态 |
| accountant        | **User**    |      |      |            | 会计信息     |
| accountantInfo   | String      |      |      |            | 会计说明     |
| active            | Boolean     |      |      | true       | 是否活跃     |
| created           | Date        |      |      | Date.now() | 创建日期     |

## 数据库接口 (\*/services.js)

| 接口名               | 输入参数                                                                                            | 输出       | 含义                           |
| -------------------- | --------------------------------------------------------------------------------------------------- | ---------- | ------------------------------ |
|createTransport|transport:Object|Observable|创建运输|
|getAllTransports||Observable|获取所有运输|
|getTransportsWithPg|pageNumber:Number,<br>pageSize:Number<br>,[values:{driver:String, captain:String,fromDate:String,toDate:String}]|Observable|根据查询获取具体页面运输|
