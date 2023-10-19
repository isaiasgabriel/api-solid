export class TwiceCheckInError extends Error {
  constructor() {
    super('You checked-in twice this day.')
  }
}
