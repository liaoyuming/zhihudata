# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from mongoengine import *

class Answers(Document):
    _id = ObjectIdField()
    id = IntField()
    question = IntField()
    url = StringField()
    thumbnail = StringField()
    content = StringField()
    author = StringField()
    voteup_count = IntField()
    comment_count = IntField()

class Users(Document):
    _id = ObjectIdField()
    id = IntField()
    gender = IntField()
