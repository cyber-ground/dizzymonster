'use strict';
export default function console_color(i, arg) {console.log(`\u001b[${i}m ${arg}`)}
export function console_red(arg) {console.log(`\u001b[31m ${arg}`)}
export function console_green(arg) {console.log(`\u001b[32m ${arg}`)}
export function console_yellow(arg) {console.log(`\u001b[33m ${arg}`)}
export function console_blue(arg) {console.log(`\u001b[34m ${arg}`)}
export function console_purple(arg) {console.log(`\u001b[35m ${arg}`)}
export function console_cyan(arg) {console.log(`\u001b[36m ${arg}`)}
