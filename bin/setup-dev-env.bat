rem hubleto/erp
call composer config repositories.hubleto/erp path %1\erp
call composer require hubleto/erp dev-main

rem hubleto/framework
call composer config repositories.hubleto/framework path %1\framework
call composer require hubleto/framework dev-main

rem hubleto/assets
call composer config repositories.hubleto/assets path %1\assets
call composer require hubleto/assets dev-main

rem hubleto/enterprise
call composer config repositories.hubleto/enterprise path %1\enterprise
call composer require hubleto/enterprise dev-main

rem hubleto/reacct-ui
call composer config repositories.hubleto/reacct-ui path %1\reacct-ui
call composer require hubleto/reacct-ui dev-main

rem hubleto/react-ui
call npm install file:%1\react-ui
