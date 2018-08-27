// // logging.d.ts
// declare module '@google-cloud/logging' {
//   export interface LogConfig {
//     removeCircular: boolean
//   }

//   export class Entry {
//     metadata: object
//     data: object
//     constructor (metadata: object | null | undefined, data: object | string)
//     constructor (data: object | string)
//     toJSON (options?: LogConfig): any
//   }

//   interface WriteOptions {
//     gaxOptions: object
//     labels: object[]
//     resource: object
//   }

//   type LogWriteCallback = (err: Error | null, apiResponse: object) => void
//   type DeleteLogCallback = (err: Error | null, apiResponse: object) => void

//   type LogWriteResponse = object[]
//   type DeleteLogResponse = object[]

//   type EntryArg = Entry | Entry[]

//   export class Log {
//     constructor (logging: Logging, name: string, options: LogConfig)
//     alert (entry: EntryArg, options?: WriteOptions, callback?: LogWriteCallback): Promise<LogWriteResponse>
//     critical (entry: EntryArg, options?: WriteOptions, callback?: LogWriteCallback): Promise<LogWriteResponse>
//     debug (entry: EntryArg, options?: WriteOptions, callback?: LogWriteCallback): Promise<LogWriteResponse>
//     emergency (entry: EntryArg, options?: WriteOptions, callback?: LogWriteCallback): Promise<LogWriteResponse>
//     info (entry: EntryArg, options?: WriteOptions, callback?: LogWriteCallback): Promise<LogWriteResponse>
//     notice (entry: EntryArg, options?: WriteOptions, callback?: LogWriteCallback): Promise<LogWriteResponse>
//     warning (entry: EntryArg, options?: WriteOptions, callback?: LogWriteCallback): Promise<LogWriteResponse>
//     error (entry: EntryArg, options?: WriteOptions, callback?: LogWriteCallback): Promise<LogWriteResponse>
//     write (entry: EntryArg, options?: WriteOptions, callback?: LogWriteCallback): Promise<LogWriteResponse>
//     delete (gaxOptions: object): Promise<DeleteLogResponse>
//     delete (gaxOptions: object, callback?: DeleteLogCallback): Promise<DeleteLogResponse>
//     delete (callback?: DeleteLogCallback): Promise<DeleteLogResponse>
//   }

//   export interface ClientConfig {
//     projectId?: string
//     keyFilename?: string
//     email?: string
//     credentials?: {
//       client_email: string
//       private_key: string
//     }
//     autoRetry?: boolean
//     maxRetries?: number
//     promise?: Function
//   }

//   export class Logging {
//     constructor (options: ClientConfig)
//     log (name: string, options?: LogConfig): Log
//     entry (resource: object | string | null | undefined, data: object | string): Entry
//   }
// }
