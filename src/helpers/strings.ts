import { isNil } from 'lodash'

const withoutHTML = (value: string | null): string | null =>
  !isNil(value)
    ? value.replace(new RegExp(/(<([^>]+)>)/gi), '')
    : value

export {
  withoutHTML,
}
