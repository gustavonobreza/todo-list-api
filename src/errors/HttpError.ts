import HttpStatusCode from './HttpCodes'

export class HttpError implements Error {
  public readonly name = 'HTTP ERROR'
  constructor(
    public code: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    public message: string = 'Some error occurred.',
  ) {
    console.log('OOOOOOOOOOOOOOOOOOOI')
  }
}
