from django import template

register = template.Library()

def divide(value, divisor):
    if int(divisor) != 0:
        return float(value) / float(divisor)
    else:
        return 0

def percent(value, precise = 0):
    return str(round(float(value) * 100, precise)) + '%'

register.filter('divide', divide)
register.filter('percent', percent)

from django.utils.safestring import mark_safe
import json

def json_dumps(value):
    return mark_safe(json.dumps(value))

register.filter('json_dumps', json_dumps)
