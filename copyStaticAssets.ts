import * as shell from 'shelljs';

shell.cp('-R', 'src/public/js/lib', 'dist/public/js/');
shell.cp('-R', 'src/public/font', 'dist/public/');
shell.cp('-R', 'src/public/img', 'dist/public/');
