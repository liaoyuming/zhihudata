# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from mongoengine import *


class Users(Document):
    _id = ObjectIdField()
    id = IntField()
    gender = IntField()
    answer_count = IntField()
    follower_count = IntField()
    locations = ListField()
    educations = ListField()
    thanked_count = IntField()
    favorited_count = IntField()
    following_count = IntField()
    following_question_count = IntField()

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

class Questions(Document):
    _id = ObjectIdField()
    title = StringField()
