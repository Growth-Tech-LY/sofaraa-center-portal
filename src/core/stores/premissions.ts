export const premissions = {
  halls: {
    showed: false,
    add: false,
    delete: false,
    edit: false
  },
  courses: {
    showed: false,
    add: false,
    delete: false,
    edit: false
  }
}

const givePremission = () => {
  const Codes = localStorage.getItem('permissionCodes')
  const permissionCodes = JSON.parse(Codes as string)

  if (permissionCodes) {
    permissionCodes.forEach((permission: any) => {
      switch (permission.code) {
        case '12001':
          premissions.halls.showed = true
          break
        case '12003':
          premissions.halls.add = true
          break
        case '12004':
          premissions.halls.edit = true
          break
        case '12005':
          premissions.halls.delete = true
          break

        case '10001':
          premissions.courses.showed = true
          break
        case '10003':
          premissions.courses.add = true
          break
        case '10004':
          premissions.courses.edit = true
          break
        case '10005':
          premissions.courses.delete = true
          break
        default:
          break
      }
    })
  }
  console.log(premissions)
}

// Call the givePremission function to update permissions
export { givePremission }
