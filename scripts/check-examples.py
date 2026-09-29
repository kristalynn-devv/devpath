"""Validate new lesson content and execute standard-library examples only."""
import ast
import contextlib
import io
import json
import subprocess

result = subprocess.run(['node', '--input-type=module', '-e',
    'import { advancedCourses } from "./app/advanced-courses.ts"; process.stdout.write(JSON.stringify(advancedCourses))'],
    capture_output=True, text=True, check=True)
courses = json.loads(result.stdout)
executed = 0
total = 0
for course in courses:
    expected = 11 if course['id'] == 4 else 8
    assert len(course['lessons']) == expected
    for lesson in course['lessons']:
        total += 1
        assert all(lesson[key] for key in ['title', 'intro', 'concepts', 'code', 'output', 'exercise', 'question', 'choices', 'explanation'])
        assert 0 <= lesson['answer'] < len(lesson['choices'])
        tree = ast.parse(lesson['code'])
        external = any(isinstance(n, (ast.Import, ast.ImportFrom)) and
            (n.names[0].name if isinstance(n, ast.Import) else n.module).split('.')[0] in ['torch', 'sklearn', 'numpy', 'chromadb']
            for n in ast.walk(tree))
        if not external:
            output = io.StringIO()
            with contextlib.redirect_stdout(output):
                exec(compile(tree, lesson['title'], 'exec'), {})
            assert output.getvalue().strip() == lesson['output'], (lesson['title'], output.getvalue())
            executed += 1
print(f'{total} lessons validated; {total} snippets parse; {executed} standard-library snippets executed with matching output.')
