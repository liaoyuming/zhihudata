# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.views.generic.base import TemplateView
from app.models import *
from django.core.cache import cache

class IndexPageView(TemplateView):
    template_name = 'app/index.html'
    def get_context_data(self, **kwargs):
        context = super(IndexPageView, self).get_context_data(**kwargs)
        context['statistic_count'] = {
            'user': Users.objects.count(),
            'answer': Answers.objects.count(),
            'question': Questions.objects.count(),
        }
        context['statistic'] = getStatistic(self.request.GET.get('clear_cache', 0));
        return context

class UserMapPageView(TemplateView):
    template_name = 'app/user_map.html'

    def get_context_data(self, **kwargs):
        context = super(UserMapPageView, self).get_context_data(**kwargs)
        context['statistic'] = getStatistic(self.request.GET.get('clear_cache', 0));
        return context


class UserMajorPageView(TemplateView):
    template_name = 'app/user_major.html'

    def get_context_data(self, **kwargs):
        context = super(UserMajorPageView, self).get_context_data(**kwargs)
        context['statistic'] = getStatistic(self.request.GET.get('clear_cache', 0));
        return context

class UserRankPageView(TemplateView):
    template_name = 'app/user_rank.html'

    def get_context_data(self, **kwargs):
        context = super(UserRankPageView, self).get_context_data(**kwargs)
        page_size = 10
        page = int(self.request.GET.get('page')) if self.request.GET.get('page') else 1
        orderby = self.request.GET.get('orderby') if self.request.GET.get('orderby') else 'follower_count'

        user_list = Users.objects.order_by('-' + orderby).skip((page - 1) * page_size).limit(page * page_size)

        paginator = Paginator(user_list, page_size) # Show 10 contacts per page

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

class AnswerRankPageView(TemplateView):
    template_name = 'app/answer_rank.html'

    def get_context_data(self, **kwargs):
        context = super(AnswerRankPageView, self).get_context_data(**kwargs)
        page_size = 10
        page = int(self.request.GET.get('page')) if self.request.GET.get('page') else 1
        orderby = self.request.GET.get('orderby') if self.request.GET.get('orderby') else 'voteup_count'

        answer_list = Answers.objects.order_by('-' + orderby).skip((page - 1) * page_size).limit(page * page_size)

        paginator = Paginator(answer_list, page_size) # Show 25 contacts per page

        try:
            answers = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            answers = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            answers = paginator.page(paginator.num_pages)
        context['orderby'] = orderby
        context['answers'] = answers
        return context

class DataAnalysisPageView(TemplateView):
    template_name = 'app/data_analysis.html'

    def get_context_data(self, **kwargs):
        context = super(DataAnalysisPageView, self).get_context_data(**kwargs)
        context['statistic'] = getStatistic(self.request.GET.get('clear_cache', 0));
        return context

class RankingStatisticsPageView(TemplateView):
    template_name = 'app/ranking_statistics.html'

    def get_context_data(self, **kwargs):
        context = super(RankingStatisticsPageView, self).get_context_data(**kwargs)
        page_size = 12
        page = int(self.request.GET.get('page', 1))
        orderby = self.request.GET.get('orderby', 'follower_count')

        user_list = Users.objects.order_by('-' + orderby).skip((page - 1) * page_size).limit(page * page_size)

        paginator = Paginator(user_list, page_size) # Show 12 contacts per page

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

def     getStatistic(force = 0):
    if cache.get('statistic') and not force:
        return cache.get('statistic')

    users = Users.objects.only('locations', 'educations')
    user_location_statistic = {}
    user_major_statistic = {}
    user_major_count = 0;
    for user in users:
        # location statistic
        if user.locations:
            for location in user.locations:
                if (location['name'] in user_location_statistic):
                    user_location_statistic[location['name']]['count'] += 1
                else:
                    user_location_statistic[location['name']] = {
                        'name': location['name'],
                        'count': 1
                    }
        # major statistic
        if user.educations:
            for education in user.educations:
                try:
                    if education['major']:
                        if (education['major']['name'] in user_major_statistic):
                            user_major_statistic[education['major']['name']]['count'] += 1
                        else:
                            user_major_statistic[education['major']['name']] = {
                                'name': education['major']['name'],
                                'count': 1
                            }
                        user_major_count += 1;
                except KeyError:
                    pass
    statistic = {
        'user': {
            'gender': {
                'all': Users.objects(gender__in = [0, 1]).count(),
                'male': Users.objects(gender = 1).count(),
                'female': Users.objects(gender = 0).count(),
            },
            'answer_count': {
                'all': Users.objects(answer_count__gte = 0).count(),
                'positive': Users.objects(answer_count__gt = 0).count(),
                'zero': Users.objects(answer_count = 0).count(),
                'one_to_ten': Users.objects(Q(answer_count__gte = 1) & Q(answer_count__lte = 10)).count(),
                'eleven_to_hundred': Users.objects(Q(answer_count__gte = 11) & Q(answer_count__lte = 100)).count(),
                'hundred_to_more': Users.objects(answer_count__gte = 101).count(),
            },
            'follower_count': {
                'all': Users.objects(follower_count__gte = 0).count(),
                'zero': Users.objects(follower_count = 0).count(),
                'one_to_ten': Users.objects(Q(follower_count__gte = 1) & Q(follower_count__lte = 10)).count(),
                'eleven_to_hundred': Users.objects(Q(follower_count__gte = 11) & Q(follower_count__lte = 100)).count(),
                'hundred_to_thousand': Users.objects(Q(follower_count__gte = 101) & Q(follower_count__lte = 1000)).count(),
                'thousand_to_more': Users.objects(follower_count__gte = 1001).count(),
            },
            'following_count': {
                'all': Users.objects(following_count__gte = 0).count(),
                'zero': Users.objects(following_count = 0).count(),
                'one_to_ten': Users.objects(Q(following_count__gte = 1) & Q(following_count__lte = 10)).count(),
                'eleven_to_hundred': Users.objects(Q(following_count__gte = 11) & Q(following_count__lte = 100)).count(),
                'hundred_to_thousand': Users.objects(Q(following_count__gte = 101) & Q(following_count__lte = 1000)).count(),
                'thousand_to_more': Users.objects(following_count__gte = 1001).count(),
            },
            'locations': user_location_statistic,
            'major': user_major_statistic,
            'major_count': user_major_count,
        }
    }

    cache.set('statistic', statistic, 24 * 3600)

    return statistic;
