# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.views.generic.base import TemplateView
from app.models import *

class DataAnalysisPageView(TemplateView):
    template_name = 'app/data_analysis.html'

    def get_context_data(self, **kwargs):
        context = super(DataAnalysisPageView, self).get_context_data(**kwargs)
        context['statistic'] = {
            'user': {
                'gender': {
                    'all': Users.objects(gender__in=[0, 1]).count(),
                    'male': Users.objects(gender=0).count(),
                    'female': Users.objects(gender=1).count(),
                },
                'answer_count': {
                    'all': Users.objects(answer_count__gte=0).count(),
                    'positive': Users.objects(answer_count__gt=0).count(),
                    'zero': Users.objects(answer_count=0).count(),
                    'one_to_ten': Users.objects(Q(answer_count__gte=1) & Q(answer_count__lte=10)).count(),
                    'eleven_to_hundred': Users.objects(Q(answer_count__gte=11) & Q(answer_count__lte=100)).count(),
                    'hundred_to_more': Users.objects(answer_count__gte=101).count(),
                },
                'follower_count': {
                    'all': Users.objects(follower_count__gte=0).count(),
                    'zero': Users.objects(follower_count=0).count(),
                    'one_to_ten': Users.objects(Q(follower_count__gte=1) & Q(follower_count__lte=10)).count(),
                    'eleven_to_hundred': Users.objects(Q(follower_count__gte=11) & Q(follower_count__lte=100)).count(),
                    'hundred_to_thousand': Users.objects(Q(follower_count__gte=101) & Q(follower_count__lte=1000)).count(),
                    'thousand_to_more': Users.objects(follower_count__gte=1001).count(),
                },
                'following_count': {
                    'all': Users.objects(following_count__gte=0).count(),
                    'zero': Users.objects(following_count=0).count(),
                    'one_to_ten': Users.objects(Q(following_count__gte=1) & Q(following_count__lte=10)).count(),
                    'eleven_to_hundred': Users.objects(Q(following_count__gte=11) & Q(following_count__lte=100)).count(),
                    'hundred_to_thousand': Users.objects(Q(following_count__gte=101) & Q(following_count__lte=1000)).count(),
                    'thousand_to_more': Users.objects(following_count__gte=1001).count(),
                },
            }
        }
        return context

class RankingStatisticsPageView(TemplateView):
    template_name = 'app/ranking_statistics.html'

    def get_context_data(self, **kwargs):
        context = super(RankingStatisticsPageView, self).get_context_data(**kwargs)
        page_size = 12
        page = self.request.GET.get('page') if self.request.GET.get('page') else 1
        orderby = self.request.GET.get('orderby')

        if orderby:
            user_list = Users.objects.order_by(orderby).skip((page - 1) * page_size).limit(page * page_size)
        else:
            user_list = Users.objects.skip((page - 1) * page_size).limit(page * page_size)

        paginator = Paginator(user_list, page_size) # Show 25 contacts per page

        try:
            users = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            users = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            users = paginator.page(paginator.num_pages)
        context['orderby'] = orderby
        context['users'] = users
        return context

class FetchingStatisticsPageView(TemplateView):
    template_name = 'app/fetching_statistics.html'

    def get_context_data(self, **kwargs):
        context = super(FetchingStatisticsPageView, self).get_context_data(**kwargs)
        context['statistic_count'] = {
            'user': Users.objects.count(),
            'answer': Answers.objects.count(),
            'question': Questions.objects.count(),
        }
        return context
