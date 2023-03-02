<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Welcome to Asset Management System</title>
        <link rel="icon" type="image/x-icon" href="favicon.svg">
    </head>
    <body class="antialiased">
        <div id="root"></div>
        <script src="{{ mix('/js/app.js')}} "></script>
        <script src="{{ mix('js/manifest.js') }}"></script>
        <script src="{{ mix('js/vendor.js') }}"></script>
    </body>
</html>
