export const genralConfig = {
    storage: {
        'USER': 'user',
        'USERNAME': 'username',
        'USERTYPE': 'usertype',
        'PROFILE_PIC': 'profilepic',
        'TOKEN': 'token',
        'ID': 'id',
        'USERFNAME': 'userfname',
        'USERLNAME': 'userlname',
        'All': 'all',
        'isLoggedin': 'isLoggedin'
    },
    pattern: {

        // 'NAME': /^[a-zA-Z,.'\-\,]+$/,
        'NAME': /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,

        'REPORTNAME': /^[ A-Za-z]*$/,
        'CODE': /^[ A-Za-z_@./#&+-/'/"]*$/,
        'DURATION': /^[0-9]{0,3}$/,
        'PRICING': /^[0-9.]{0,7}$/,

        // "CITY": /^[a-zA-Z . \-\']*$/,
        "CITY": /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/,
        // old one email pattern
        // "EMAIL": /^(([^<>()\[\]\\.,,:\s@"]+(\.[^<>()\[\]\\.,,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        // new and correct email pattern
        "EMAIL": /^([a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z])(\.([a-zA-Z]{2,4})){0,1}(\.[a-zA-Z]{2,4}))$/,

        // "POSTAL_CODE": /^[0-9A-Z]{4}/, // /^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/,
        "POSTAL_CODE": /^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/,

        // "PHONE_NO": /^\(?(?:\+?61|0)(?:(?:2\)?[ -]?(?:3[ -]?[38]|[46-9][ -]?[0-9]|5[ -]?[0-35-9])|3\)?(?:4[ -]?[0-57-9]|[57-9][ -]?[0-9]|6[ -]?[1-67])|7\)?[ -]?(?:[2-4][ -]?[0-9]|5[ -]?[2-7]|7[ -]?6)|8\)?[ -]?(?:5[ -]?[1-4]|6[ -]?[0-8]|[7-9][ -]?[0-9]))(?:[ -]?[0-9]){6}|4\)?[ -]?(?:(?:[01][ -]?[0-9]|2[ -]?[0-57-9]|3[ -]?[1-9]|4[ -]?[7-9]|5[ -]?[018])[ -]?[0-9]|3[ -]?0[ -]?[0-5])(?:[ -]?[0-9]){5})$/,
        // "MOB_NO": /^\(?(?:\+?61|0)(?:(?:2\)?[ -]?(?:3[ -]?[38]|[46-9][ -]?[0-9]|5[ -]?[0-35-9])|3\)?(?:4[ -]?[0-57-9]|[57-9][ -]?[0-9]|6[ -]?[1-67])|7\)?[ -]?(?:[2-4][ -]?[0-9]|5[ -]?[2-7]|7[ -]?6)|8\)?[ -]?(?:5[ -]?[1-4]|6[ -]?[0-8]|[7-9][ -]?[0-9]))(?:[ -]?[0-9]){6}|4\)?[ -]?(?:(?:[01][ -]?[0-9]|2[ -]?[0-57-9]|3[ -]?[1-9]|4[ -]?[7-9]|5[ -]?[018])[ -]?[0-9]|3[ -]?0[ -]?[0-5])(?:[ -]?[0-9]){5})$/,

        /* "PHONE_NO" : /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/  - for 10-12 valid digits */
        "PHONE_NO": /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,4}$/,
        "FIRM_NUMBER": /^[a-z0-9\-]+$/,
        "MOB_NO": /\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/,
        "PASSWORD": /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/,
        "DESCRIPTION": /^[ !@#$%^&*()~:;{}?'"=<>A-Za-z0-9_@./#&+-,-]*$/,
        "REFNO": /^[ 0-9_@./#&+-,-]*$/,
        "TASK_CODE": /^[0-9999]{1,4}$/,
        "SUB_DOMAIN": /^[/a-z/A-Z][a-zA-Z0-9-]*[^/-/./0-9]$/,
        "PHONE_NO_MASK": ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        "IVR_ACTION_KEY": /^[0-9]*$/,
        "IVR_NUMBER": /^[0-9]*$/,
        "RADIUS": /^[0-9]*(?:.)([0-9])+$/,
        "LATLONG": /^\s*(\-?\d+(\.\d+)?)$/,
        "SSN": /^((\d{3}-?\d{2}-?\d{4})|(X{3}-?X{2}-?X{4}))$/,
        "SSN_MASK": [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        "PRACTICE_PASSWORD": /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "USERNAME": /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){1,14}[a-zA-Z0-9]$/,
        "USERNAME_MIN_SIZ": /^[a-zA-Z0-9_](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9_]){4,18}[a-zA-Z0-9_]$/,
        "WICARE_USERNAME": /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{1,}/,
        "YEAR_MASK": /d{4}/,
        "DECIMAL": /\d+(\.\d{1,2})?/,
        "MAXLENGTH": 50,
        "MINLENGTH": 3,
        "ASINMAXLENGTH": 10,
        "BINMAXLENGTH": 3,

        "CLINICNAMELENGTH": 120,
        "AUTHISNOTREQ": ['userLogin', 'signup'],
        "PASSWORDMAXLENGTH": 15,
        "PASSWORDMINLENGTH": 6,
        "MOBILEMAX": 12,
        "MOBILEMIN": 10,
        "NAMEMAXLENGTH": 16,
        "NAMEMINLENGTH": 3,
        "ADDRESSMAXLENGTH": 200
    },

    paginator: {
        COUNT: 10,
        PAGE: 1
    },

    admin_notification_tooltip_messages: {
        'ACCEPT': "Accept request",
        'REJECT': "Reject request"
    },

    lawyerlist_action_tooltip_messages: {
        'VIEW': "View",
        'EDIT': "Edit",
        'DELETE': "Delete",
    },

    admin: {
        'ID': '5d652a3d85cad733861602ff',
    },

    demo_lawfirm: {
        'ID': '5d67c0eeaf2d7445a135506b',
    },

    roleId: {
        'ADMIN': "5d42a85cabb80d27b2723ce0",
        'LAWFIRM': "5d42a804abb80d27b2723cdc",
        'INSURANCECOMP': "5d42a81cabb80d27b2723cdd",
        'LAWYER': "5d42a7c2a70ee12722ce1d07",
        'CASEMANAGER': "5d42a83fabb80d27b2723cde",
        'SPECIALIST': "5d4a640f85cad73386ae4f61",
        'PATIENT': "5d42a849abb80d27b2723cdf"
    },

    rolename: {
        'ADMIN': "Admin",
        'LAWFIRM': "Law firms",
        'INSURANCECOMP': "Insurance company",
        'LAWYER': "Lawyer",
        'CASEMANAGER': "Case manager",
        'SPECIALIST': "Specialist",
        'PATIENT': "Patient"
    },

    statusCode: {
        "ok": 200,
        "unauth": 401,
        "warning": 404,
        "validation": 400,
        "failed": 1002,
        "invalidURL": 1001,
        "paymentReq": 402,
        "internalError": 1004,
        "forbidden": 403,
        "internalservererror": 500,
        "alreadyExist": 409,//conflict
        "data_not_found": 204,
        "created": 201
    },
    passwordCreatedmessage: 'Password created sucessfully',
    passwordChangemessage: 'Password change sucessfully',
    Image: {
        IMAGE_FORMAT_NOT_SUPPORTED: 'Image format not supported',
        IMAGE_SIZE_EXCEED: 'Image is too large, please upload upto 20 MB size',
        FILE_FORMAT_NOT_SUPPORTED: 'File format is not supported, please upload a file with one of the following extensions: .jpg,.jpeg,.png'
    }, 
    CSV: {
        CSV_FORMAT_NOT_SUPPORTED: 'CSV format not supported',
        CSV_SIZE_EXCEED: 'CSV is too large, please upload upto 20 MB size',
        FILE_FORMAT_NOT_SUPPORTED: 'File format is not supported, please upload a file with one of the following extensions: .csv'
    },

    options: {
        displayField: 'name',
        isExpandedField: 'expanded',
        idField: null,
        hasChildrenField: 'nodes',
        actionMapping: {},
        nodeHeight: 23,
        allowDrag: false,
        allowDrop: false,
        allowDragoverStyling: false,
        levelPadding: 10,
        useVirtualScroll: true,
        animateExpand: true,
        scrollOnActivate: true,
        animateSpeed: 30,
        animateAcceleration: 1.2,
        scrollContainer: document.documentElement // HTML
    }

}